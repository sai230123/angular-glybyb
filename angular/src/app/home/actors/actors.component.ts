import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CapstoneService } from 'src/app/shared/capstone.service';
import { Actor, ActorResponse, CapstoneResponse } from 'src/app/shared/model/capstone.model';
import { ToastService } from 'src/app/shared/toast.service';


@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss']
})
export class ActorsComponent implements OnInit {

  private modalRef?: NgbModalRef;
  closeResult = '';
  actorForm: FormGroup;
  showSpinner: boolean = false;
  dataList: Actor[] = [];
  activeActor?: Actor;
  isEditFlow: boolean = false;

	total: number = 0;
  currentPage: number = 1;

  constructor(private modalService: NgbModal, private service: CapstoneService, private toastService: ToastService) {
    this.actorForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
    });
  }

  getPages() {
    return Array(this.total).filter(i=> i > 0).map((x,i)=>i);
  }

  ngOnInit(): void {
    this.fetchAllActors();
  }

  fetchAllActors() {
    this.showSpinner = true;
    this.total = 0;
    this.service.getAllActors().subscribe((res: ActorResponse) => {
      this.showSpinner = false;
      if (res.success) {
        this.dataList = res.data;
        this.total = this.dataList.length;
      }
    }, error => {
      this.showSpinner = false;
    });
  }

  private dateToString = (date: any) => `${date.year}-${date.month}-${date.day}`; 

  open(content: any, actor?: Actor) {
    this.activeActor = undefined;
    this.isEditFlow = false;
    if (actor) {
      const [year, month, day] = actor.dob.split('-');

      this.isEditFlow = true;
      this.activeActor = actor;
      this.actorForm.setValue({
        firstName: actor.first_name,
        lastName: actor.last_name,
        gender: actor.gender,
        dob: {
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day)
        },
      })
    }else {
      this.actorForm.reset();
    }
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  saveActor() {
    console.log(this.actorForm.get('dob')?.value);
    let actorRequest: Actor = {
      first_name: this.actorForm.get('firstName')?.value,
      last_name: this.actorForm.get('lastName')?.value,
      dob:  this.dateToString(this.actorForm.get('dob')?.value),
      gender: this.actorForm.get('gender')?.value
    }
    if (this.isEditFlow) {
      actorRequest.id = this.activeActor?.id;
    }

    this.showSpinner = true;
    this.service.saveActors(actorRequest, this.isEditFlow).subscribe((res: ActorResponse) => {
      this.showSpinner = false;
      if (res.success) {
        this.toastService.show(!this.isEditFlow ? 'Actor Added Successfully' : 'Actor Modified Successfully');
        this.fetchAllActors();
      } else {
        this.toastService.show(!this.isEditFlow ? 'Error Occurred while Adding Actor' : 'Error Occurred while Updating Actor', { status: 'error' });
      }
      this.modalRef?.close();
    }, error => {
      this.showSpinner = false;
      this.toastService.show(!this.isEditFlow ? 'Error Occurred while Adding Actor' : 'Error Occurred while Updating Actor', { status: 'error' });
    });
  }

  deleteActor(id: any) {
    this.showSpinner = true;
    this.service.deleteActor(id).subscribe((res: ActorResponse) => {
      this.showSpinner = false;
      if (res.success) {
        this.toastService.show('Actor Deleted Successfully');
        this.fetchAllActors();
      }else {
        this.toastService.show('Error Occurred while Deleting Actor' , { status: 'error' });
      }
    }, error => {
      this.showSpinner = false;
      this.toastService.show('Error Occurred while Deleting Actor' , { status: 'error' });
    });
  }

}
