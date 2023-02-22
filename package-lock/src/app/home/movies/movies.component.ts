import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CapstoneService } from 'src/app/shared/capstone.service';
import { Movie, ActorResponse, CapstoneResponse, MovieResponse, Actor } from 'src/app/shared/model/capstone.model';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  private modalRef?: NgbModalRef;
  closeResult = '';
  movieForm: FormGroup;
  showSpinner: boolean = false;
  dataList: Movie[] = [];
  activeActor?: Movie;
  isEditFlow: boolean = false;

  constructor(private modalService: NgbModal, private service: CapstoneService, private toastService: ToastService) {
    this.movieForm = new FormGroup({
      title: new FormControl('', Validators.required),
      cost: new FormControl('', Validators.required),
      actor: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
    });
  }

  onFileChange($event: any) {
    let file = $event.target.files[0];
    this.movieForm.patchValue({
      file: file
    });
  }

  ngOnInit(): void {
    this.fetchAllMovies();
  }

  fetchAllMovies() {
    this.showSpinner = true;
    this.service.getAllMovies().subscribe((res: MovieResponse) => {
      this.showSpinner = false;
      if (res.success) {
        this.dataList = res.data;
      }
    }, error => {
      this.showSpinner = false;
    });
  }

  private dateToString = (date: any) => `${date.year}-${date.month}-${date.day}`;

  open(content: any, actor?: Movie) {
    this.activeActor = undefined;
    this.isEditFlow = false;
    if (actor) {
      this.isEditFlow = true;
      this.activeActor = actor;

      this.movieForm.setValue({
        title: actor.title,
        cost: actor.cost,
        actor: actor.actor,
        year: actor.actor
      });
    } else {
      this.movieForm.reset();
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

  saveMovie() {
    let request: Movie = {
      title: this.movieForm.get('title')?.value,
      cost: this.movieForm.get('cost')?.value,
      year: this.movieForm.get('year')?.value,
      actor: this.movieForm.get('actor')?.value,
      photo: this.movieForm.get('file')?.value,
    };
    if (this.isEditFlow) {
      request.id = this.activeActor?.id;
    }

    this.showSpinner = true;
    this.service.uploadMovie(null, request, this.isEditFlow).subscribe((res: MovieResponse) => {
      this.showSpinner = false;
      if (res.success) {
        this.toastService.show(!this.isEditFlow ? 'Movie Added Successfully' : 'Movie Modified Successfully');
        this.fetchAllMovies();
      } else {
        this.toastService.show(!this.isEditFlow ? 'Error Occurred while Adding Movie' : 'Error Occurred while Updating Movie', { status: 'error' });
      }
      this.modalRef?.close();
    }, error => {
      this.showSpinner = false;
      this.toastService.show(!this.isEditFlow ? 'Error Occurred while Adding Movie' : 'Error Occurred while Updating Movie', { status: 'error' });
    });
  }

  deleteMovie(id: any) {
    this.showSpinner = true;
    this.service.deleteMovie(id).subscribe((res: ActorResponse) => {
      this.showSpinner = false;
      if (res.success) {
        this.toastService.show('Movie Deleted Successfully');
        this.fetchAllMovies();
      } else {
        this.toastService.show('Error Occurred while Deleting Movie', { status: 'error' });
      }
    }, error => {
      this.showSpinner = false;
      this.toastService.show('Error Occurred while Deleting Movie', { status: 'error' });
    });
  }

}
