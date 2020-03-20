import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { AddUserComponent } from '../add-user/add-user.component';

import { ItemService } from 'src/app/services/item.service';
import { UtilService } from 'src/app/services/util.service';
import { EmitterService } from 'src/app/services/emitter.service';
import { constants } from 'src/app/app.constants';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  addItemForm: FormGroup;
  submitted = false;
  hide = true;
  type = 'meal';

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private formBuilder: FormBuilder, private itemService: ItemService, private utils: UtilService,
    public dialogRef: MatDialogRef<AddUserComponent>, private emitterService: EmitterService) { }

  ngOnInit() {

    this.addItemForm = this.formBuilder.group({
      name: [this.data.item.name, [Validators.required]],
      price: [this.data.item.price, [Validators.required, Validators.pattern(/^\d{0,8}(\.\d{1,4})?$/)]],
      type: [this.data.item.type, [Validators.required]]
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
      type: this.addItemForm.value.type,
      id: this.data.item._id
    };

    this.itemService.updateItem(item).subscribe(
      (res: any) => {
        if (res.success) {
          this.emitterService.emit(constants.emitterKeys.itemAdded);
          this.dialogRef.close({...res.item});
        }
      },
      err => {
        this.utils.openSnackBar('An error occurred while updating the item', 'Retry');
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