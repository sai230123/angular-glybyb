import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent implements OnInit {

  constructor(private toastService: ToastService, private router: Router) { }

  ngOnInit(): void {
  }

  redirectToLogin() {
    this.toastService.show('You have successfully logout!!');
    this.router.navigate(['/']);
  }

}
