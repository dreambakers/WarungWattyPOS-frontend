import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { PasswordValidation } from '../helpers/password-validation';
import { UserService } from '../services/user.service';
import { UtilService } from '../services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  hide = true;
  loading = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService, private utils: UtilService,
    private userService: UserService, private router: Router) { }

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

    this.loading = true;
    this.auth.authenticateUser(this.signupForm.value.username, this.signupForm.value.password, true, 'admin').subscribe(
      response => {
        if (response.headers.get('x-auth')) {
          const user = { ...response.body, authToken: response.headers.get('x-auth') };
          this.userService.setLoggedInUser(user);
          this.router.navigateByUrl('/dashboard');
        } else {
          this.loading = false;
          this.utils.openSnackBar('An error occured while signing up. ', 'Retry');
        }
      },
      errorResponse => {
        this.loading = false;
        const errorMessage = errorResponse.error.alreadyExists ? 'A user with the same email already exists.' : 'An error occured while signing up.';
        this.utils.openSnackBar(errorMessage, 'Retry');
      }
    );
  }

}
