import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CapstoneService } from 'src/app/shared/capstone.service';
import { Review, ActorResponse, CapstoneResponse, ReviewResponse } from 'src/app/shared/model/capstone.model';
import { ToastService } from 'src/app/shared/toast.service';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  private modalRef?: NgbModalRef;
  closeResult = '';
  reviewForm: FormGroup;
  showSpinner: boolean = false;
  dataList: Review[] = [];
  activeActor?: Review;
  isEditFlow: boolean = false;

	total: number = 0;
  currentPage: number = 1;

  constructor(private modalService: NgbModal, private service: CapstoneService, private toastService: ToastService) {
    this.reviewForm = new FormGroup({
      description: new FormControl('', Validators.required),
      movie: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
      review_date: new FormControl('', Validators.required),
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
    this.service.getAllReviews().subscribe((res: ReviewResponse) => {
      this.showSpinner = false;
      if (res.success) {
        this.dataList = res.data;
        this.total = this.dataList.length;
      }
    }, error => {
      this.showSpinner = false;
    });
  }

  createActiveRange(){
    let num: number =  0;
    if(this.reviewForm?.get('rating')?.value) {
      num = parseInt(this.reviewForm.get('rating')?.value);
    }
    return new Array(num).fill(0)
      .map((n, index) => index + 1);
  }
  
  onClickReview(rvCnt: number, isActive: boolean) {
    if(this.reviewForm?.get('rating')?.value && !isActive) {
      rvCnt += parseInt(this.reviewForm.get('rating')?.value);
    }
    this.reviewForm.patchValue({
      rating: rvCnt
    })
  }
  
  createNonActiveRange(){
    let num: number =  5;
    if(this.reviewForm?.get('rating')?.value) {
      num = num - parseInt(this.reviewForm.get('rating')?.value);
    }
    return new Array(num).fill(0)
      .map((n, index) => index + 1);
  }

  private dateToString = (date: any) => `${date.year}-${date.month}-${date.day}`; 

  open(content: any, actor?: Review) {
    this.activeActor = undefined;
    this.isEditFlow = false;
    if (actor) {
      const [year, month, day] = actor.review_date.split('-');
      this.isEditFlow = true;
      this.activeActor = actor;
      this.reviewForm.setValue({
        description: actor.description,
        rating: actor.rating,
        movie: actor.movie,
        review_date: {
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day)
        },
      })
    }else {
      this.reviewForm.reset();
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

  saveReview() {
    console.log(this.reviewForm.get('review_date')?.value);
    let actorRequest: Review = {
      description: this.reviewForm.get('description')?.value,
      rating: this.reviewForm.get('rating')?.value,
      review_date:  this.dateToString(this.reviewForm.get('review_date')?.value),
      movie: this.reviewForm.get('movie')?.value
    }
    if (this.isEditFlow) {
      actorRequest.id = this.activeActor?.id;
    }

    this.showSpinner = true;
    this.service.saveReviews(actorRequest, this.isEditFlow).subscribe((res: ReviewResponse) => {
      this.showSpinner = false;
      if (res.success) {
        this.toastService.show(!this.isEditFlow ? 'Review Added Successfully' : 'Review Modified Successfully');
        this.fetchAllActors();
      } else {
        this.toastService.show(!this.isEditFlow ? 'Error Occurred while Adding Review' : 'Error Occurred while Updating Review', { status: 'error' });
      }
      this.modalRef?.close();
    }, error => {
      this.showSpinner = false;
      this.toastService.show(!this.isEditFlow ? 'Error Occurred while Adding Review' : 'Error Occurred while Updating Review', { status: 'error' });
    });
  }

  deleteReview(id: any) {
    this.showSpinner = true;
    this.service.deleteReview(id).subscribe((res: ReviewResponse) => {
      this.showSpinner = false;
      if (res.success) {
        this.toastService.show('Review Deleted Successfully');
        this.fetchAllActors();
      }else {
        this.toastService.show('Error Occurred while Deleting Review' , { status: 'error' });
      }
    }, error => {
      this.showSpinner = false;
      this.toastService.show('Error Occurred while Deleting Review' , { status: 'error' });
    });
  }

}
