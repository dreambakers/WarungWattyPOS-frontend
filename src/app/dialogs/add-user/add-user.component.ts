import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { PasswordValidation } from '../../helpers/password-validation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UtilService } from 'src/app/services/util.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  hide = true;
  type = 'user';

  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService,
    public dialogRef: MatDialogRef<AddUserComponent>, private utils: UtilService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      type: [this.type, [Validators.required]]
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

    this.auth.authenticateUser(this.signupForm.value.email, this.signupForm.value.password, true, this.signupForm.value.type).subscribe(
      response => {
        if (response.headers.get('x-auth')) {
          this.dialogRef.close(response.body);
        }
      },
      errorResponse => {
        const errorMessage = errorResponse.error.alreadyExists ? 'A user with the same email already exists.' : 'An error occured while signing up.';
        this.utils.openSnackBar(errorMessage, 'Retry');
      }
    );
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}