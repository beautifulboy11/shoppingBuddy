import { Component } from "@angular/core";
import {
  ViewController,
  ModalController,
  NavController,  
  NavParams,
  IonicPage
} from "ionic-angular";
@IonicPage()
@Component({
  selector: "page-popover",
  template: `
  <ion-list>
    <button ion-item (click)="productDetails()">Details</button>
    <button ion-item (click)="showCheckin()">Add Product</button>
  </ion-list>
`
})
export class PopoverPage {
  constructor(
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public navCtrl: NavController
  ) {}

  close() {
    this.viewCtrl.dismiss();
  }

  productDetails(product: any) {
    this.navCtrl.push("ProductDetailPage", {
      product: product
    });
  }

  showCheckin(member: any) {
    let modal = this.modalCtrl.create("AddItemPage");
    modal.onDidDismiss(() => {});
    modal.present();
  }
}
