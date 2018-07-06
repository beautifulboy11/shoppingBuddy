import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategoryPage {
  isReadyToSave: boolean;
  form: FormGroup;
  storeform: FormGroup;
  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      categoryName: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
      description: ["", Validators.compose([Validators.required, Validators.minLength(2)])]
    });

    this.storeform = formBuilder.group({
      storeName: ["", Validators.compose([Validators.required, Validators.minLength(2)])],
      storeLocation: ["", Validators.compose([Validators.required, Validators.minLength(2)])]
    });

    this.form.valueChanges.subscribe(v => {
      this.isReadyToSave = this.form.valid;
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  addStore() {    
    if (!this.storeform.valid) { return; }
    this.viewCtrl.dismiss(this.storeform.value);
  }
  addCategory() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
