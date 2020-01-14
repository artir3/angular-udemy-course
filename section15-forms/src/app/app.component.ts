import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = "";
  email = "";
  secret;
  @ViewChild('f' , { static: true } ) signupForm: NgForm; 
  defaultQuestion = 'pet';
  answer="";
  genders = ['male', 'female'];

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // onSubmit(form: NgForm) {
    // console.log(form)
  // }

  onSubmit() {
    if (this.signupForm.valid){
      console.log(this.signupForm)
    } else {
      console.log('Form is not valid!!!')
    }
  }
}
