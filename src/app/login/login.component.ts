import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  hide = true;

  constructor(private auth: AuthenticationService, private formBuilder: FormBuilder, private router: Router,
    private userService: UserService, private utils: UtilService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.auth.authenticateUser(this.loginForm.value.username, this.loginForm.value.password).subscribe((response: any) => {
      if (response.headers.get('x-auth')) {
        const user = { ...response.body, authToken: response.headers.get('x-auth') };
        this.userService.setLoggedInUser(user);
        this.router.navigateByUrl('/dashboard');
      }
    }, (errorResponse: any) => {
      const errorMessage = errorResponse.error.notFound ? 'No user found against the provided credentials.' : 'An error occured while logging in.';
      this.utils.openSnackBar(errorMessage, 'Retry');
    });
  }

}
