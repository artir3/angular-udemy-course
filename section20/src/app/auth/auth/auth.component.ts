import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Scheduler, Observable } from 'rxjs';
import { AuthResponseData } from '../AuthResponseeData.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.onHideError();
      
      const email = form.value.email;
      const password = form.value.password;

      let authObs: Observable<AuthResponseData>;

      if (this.isLoginMode) {
        authObs = this.authService.login(email, password)
      } else {
        authObs = this.authService.signUp(email, password)
      }

      authObs.subscribe(response => {
        console.log(response)
        this.isLoading = false;
      }, errorMeessage => {
        this.error = errorMeessage;
        this.isLoading = false;
      });

      form.reset();
    } else return;
  }

  onHideError() {
    this.error = null;
  }
}
