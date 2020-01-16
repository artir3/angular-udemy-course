import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Scheduler } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error =null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;
      
      this.isLoading = true;

      if (this.isLoginMode) {

      } else {
        this.authService.signUp(email, password)
          .subscribe(response => {
            console.log(response)
            this.isLoading = false;
          }, errorMeessage => {
            this.error = errorMeessage;
            this.isLoading = false;
          });
      }
      form.reset();
    } else return;
  }
}
