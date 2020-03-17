import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AddUserComponent } from '../add-user/add-user.component';

import { ItemService } from 'src/app/services/item.service';
import { UtilService } from 'src/app/services/util.service';

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

  constructor(private formBuilder: FormBuilder, private itemService: ItemService, private utils: UtilService,
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

    const item = {
      name: this.addItemForm.value.name,
      price: this.addItemForm.value.price,
      type: this.addItemForm.value.type
    };

    this.itemService.addItem(item).subscribe(
      (res: any) => {
        if (res.success) {
          this.dialogRef.close({...res.item});
        }
      },
      err => {
        this.utils.openSnackBar('An error occurred while adding the item', 'Retry');
      }
    )
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