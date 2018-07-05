import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/providers';
import { moveIn } from '../../app/router.animations';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [moveIn()],
  host: { '[@moveIn]': '' }
})
export class LoginPage {
  email: string;
  password: string;
  state: string = '';
  error: any;
  public logo = "assets/imgs/logo.png";
  constructor(public navCtrl: NavController, public authService: AuthService, public alertCtrl: AlertController, public menu: MenuController) {
  }
  ionViewWillEnter() {
    this.menu.enable(false);
  }
  ionViewWillLeave() {
    this.menu.enable(true);
  }

  signIn(formData: any): void {
    if(formData.valid) {
    this.authService.signIn({email: formData.value.email,
      password: formData.value.password}).then((res) => {
      if (res) {
        this.navCtrl.setRoot('TabsPage');
      }
    }).catch((err) => {
      this.error = err;
      this.presentAlert(err);
    });
  }
  }

  facebookSignIn() {
    this.authService.facebookSignIn().then((res) => {
      if (res) {
        this.navCtrl.setRoot('TabsPage');
      }
    }).catch((err) => {
      this.presentAlert(err);
    });
  }

  googleSignIn() {
    this.authService.googleSignIn().then((res) => {
      this.navCtrl.setRoot('TabsPage');
    }).catch((err) => {
      this.presentAlert(err);
    });
  }

  entrySignUp() {
    this.navCtrl.push('SignUpPage');
  }

  presentAlert(error: any) {
    let alert = this.alertCtrl.create({
      title: error.code,
      message: error.message,
      buttons: ['OK']
    });
    alert.present();
  }



}
