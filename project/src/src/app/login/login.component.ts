import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CapstoneService } from '../shared/capstone.service';
import { CapstoneResponse, LoginRequest } from '../shared/model/capstone.model';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showSpinner: boolean = false;
  loginForm: FormGroup;

  constructor(
    private service: CapstoneService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      loginId: new FormControl('', Validators.required),
      psw: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}$'
        ),
      ]),
    });
  }

  ngOnInit(): void {}

  doLogin() {
    const loginRequest: LoginRequest = {
      loginId: this.loginForm.get('loginId')?.value,
      pwd: this.loginForm.get('psw')?.value,
    };

    this.showSpinner = true;
    this.service.login(loginRequest).subscribe(
      (res: CapstoneResponse) => {
        this.showSpinner = false;
        console.log(res);
        if (res.success) {
          this.toastService.show('I am a success toast');
          this.router.navigate(['/home', {}]);
        } else {
          this.toastService.show('I am a error toast', { status: 'error' });
        }
      },
      (error) => {
        this.showSpinner = false;
        this.toastService.show('I am a error toast', { status: 'error' });
      }
    );
  }
}
