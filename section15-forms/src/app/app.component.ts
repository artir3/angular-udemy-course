import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', { static: true }) signupForm: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];
  user: {
    name: '',
    email: '',
    questionAnswer: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: 'a@a.a'
    //   },
    //   secret: this.defaultQuestion,
    //   questionAnswer: 'dasd',
    //   gender: 'male'
    // })
    // this.signupForm.form.patchValue({
    //   userData: {
    //     username: suggestedName
    //   }
    // })
  }

  // onSubmit(form: NgForm) {
  // console.log(form)
  // }

  onSubmit() {
    this.submitted = this.signupForm.valid;
    this.user.email = this.signupForm.value.userData.email;
    this.user.name = this.signupForm.value.userData.username;
    this.user.answer = this.signupForm.value.answer;
    this.user.questionAnswer = this.signupForm.value.secret;
    this.user.gender = this.signupForm.value.gender;
    console.log(this.user)
  }
}
