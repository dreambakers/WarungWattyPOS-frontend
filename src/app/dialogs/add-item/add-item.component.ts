import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialogRef } from '@angular/material';
import { AddUserComponent } from '../add-user/add-user.component';
import { PasswordValidation } from 'src/app/helpers/password-validation';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  addItemForm: FormGroup;
  submitted = false;
  hide = true;
  type = 'meal';

  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService,
    public dialogRef: MatDialogRef<AddUserComponent>) { }

  ngOnInit() {
    this.addItemForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern(/^\d{0,8}(\.\d{1,4})?$/)]],
      type: ['item', [Validators.required]]
    });
  }

  get f() { return this.addItemForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.addItemForm.invalid) {
      return;
    }

    this.auth.authenticateUser(this.addItemForm.value.email, this.addItemForm.value.password, true);
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