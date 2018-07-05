import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  selectedProduct: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedProduct = navParams.get('product');
  }
}
