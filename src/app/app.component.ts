import { Component, ViewChild, OnInit } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Keyboard } from "@ionic-native/keyboard";
import { ProductService } from "../providers/providers";
import { timer } from "rxjs/observable/timer";
import { Category } from "../models/Category";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService } from "../providers/providers";

@Component({
  templateUrl: "app.html",
})
export class MyApp implements OnInit {
  @ViewChild("content") nav: Nav;

  rootPage: any = "LoginPage";
  showSplash: boolean = true;
  categories: Array<Category>;
  
  constructor(
    public platform: Platform,
    public keyboard: Keyboard,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public service: AuthService,
    public productService: ProductService,
    private af: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      if (this.platform.is('ios')) {
        this.keyboard.disableScroll(true);
      } if (this.platform.is('cordova')) {
        this.keyboard.disableScroll(true);
      }
      if (this.platform.is('android')) {
        this.keyboard.disableScroll(true);
      }
      this.splashScreen.hide();
      timer(3000).subscribe(() => (this.showSplash = false));
    });
    this.af.authState.subscribe(user => {
      if (user) {
        this.rootPage = 'TabsPage';
      } else {
        this.rootPage = "LoginPage";
      }
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.productService.getCategories.subscribe(category => {
      this.categories = category;
    });
  }

  logout() {
    this.service.signOut();
  }

  gotoProducts(category: Category) {
    this.nav.setRoot('ProductsPage', { category: category });
  }
}
