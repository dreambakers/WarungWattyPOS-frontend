import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { PasswordValidation } from '../helpers/password-validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  hide = true;

  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },
    {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.auth.SignUp(this.signupForm.value.username, this.signupForm.value.password);

    //this.auth.authenticateUser(this.signupForm.value.email, this.signupForm.value.password, true);
  }

}
