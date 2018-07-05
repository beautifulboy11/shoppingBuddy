import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = 'HomePage'
  searchRoot = 'SearchPage'
  locatorRoot = 'LocatorPage'
  cartRoot = 'CartPage'

  constructor(public navCtrl: NavController) {}
}
