import { Component, ViewChild, OnInit } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Keyboard } from "@ionic-native/keyboard";
import { BrowserTab } from '@ionic-native/browser-tab';
import { timer } from "rxjs/observable/timer";
import { Category } from "../providers/models/models";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService, ProductService} from "../providers/providers";

@Component({
  templateUrl: "app.html",
})
export class ShoppingApp implements OnInit {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  showSplash: boolean = true;
  categories: Array<Category>;
  
  constructor(
    public platform: Platform,
    public keyboard: Keyboard,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public service: AuthService,
    public productService: ProductService,
    public browserTab: BrowserTab,
    public af: AngularFireAuth) {
    this.appInit();
  }

  appInit() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      if (this.platform.is('ios')) 
      {
        this.keyboard.disableScroll(true);
      } 
      if (this.platform.is('cordova')) {
        this.keyboard.disableScroll(true);
        this.initPlugins();
      }
      if (this.platform.is('android')) {
        this.keyboard.disableScroll(true);
      }     
      timer(2000).subscribe(() => (this.showSplash = false));
    });


    this.af.authState.subscribe(user => {
      if (user) {
        this.rootPage = 'TabsPage';
      } else {
        this.rootPage = "LoginPage";
      }
    });
  }

  initPlugins() {
    this.statusBar.styleLightContent();
    this.statusBar.backgroundColorByHexString('#12121c');
    this.splashScreen.hide();
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

  isActive(category: Category): boolean {
    let childNav = this.nav.getActiveChildNavs()[0];
    if (childNav) {
      return childNav.getSelected() && childNav.getSelected().root === category.categoryName;
    }
    return !!(this.nav.getActive() && this.nav.getActive().name === category.categoryName);
  }

  openPage(category: Category) {
    if (this.isActive(category)) {
      return;
    }
    // let params = page.index ? { tabIndex: page.index } : {};
    // if (this.nav.getActiveChildNavs().length && page.index != undefined) {
    //   this.nav.getActiveChildNavs()[0].select(page.index);
    // } else {
    //   this.nav.setRoot(page.name, params).catch(err => console.error(err));
    // }
    this.nav.setRoot('ProductsPage', { category: category }).catch(err => console.error(err));

  }

  poweredBy() {
    let url = 'https://github.com/beautifulboy11';
    this.browserTab.isAvailable()
      .then((isAvailable: boolean) => {
        if (isAvailable) {
          this.browserTab.openUrl(url);
        }
      })
      .catch(err => console.error(err));
  }

}
