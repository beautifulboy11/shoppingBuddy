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
  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder) {    
    this.form = formBuilder.group({
      categoryName: ["", Validators.required],
      description: ["", Validators.required]
    });

    this.form.valueChanges.subscribe(v => {
      this.isReadyToSave = this.form.valid;
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
