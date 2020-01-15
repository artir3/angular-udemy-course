import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  signupForm: FormGroup;
  // projectStatuses = ['Stable', 'Critical', 'Finished'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, [
        Validators.required,
        CustomValidators.invalidProjectName
      ],
       CustomValidators.asyncInvalidProjectName
      ),
      'email': new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      'status': new FormControl('critical')
    })
  }

  onSubmit() {
    console.log(this.signupForm.value)
  }
}
