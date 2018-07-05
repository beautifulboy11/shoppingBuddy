import { Component } from "@angular/core";
import { IonicPage, NavController, ToastController, MenuController } from "ionic-angular";
import { AuthService } from "../../providers/providers";
import { moveIn, fallIn } from '../../app/router.animations';

@IonicPage()
@Component({
  selector: "page-sign-up",
  templateUrl: "sign-up.html",
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class SignUpPage {
  public logo = "assets/imgs/logo.png";  
  email: string;
  password: string;
  state: string = '';
  error: any;

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public toast: ToastController,
    public menu: MenuController
  ) {}

  ionViewWillEnter() {
    this.menu.enable(false);
  }
  ionViewWillLeave() {
    this.menu.enable(false);
  }

  signUp(formData: any): void {
    if(formData.valid) {
    this.authService
      .registerUser(formData.value.email,formData.value.password)
      .then(res => {
        this.presentMessage(true, res);
        //this.navCtrl.setRoot("TabsPage");
      })
      .catch(err => {
        this.error = err;
        //this.presentMessage(false, err);
      });
    }
  }

  login() {
    this.navCtrl.setRoot('LoginPage');
  }

  presentMessage(isSuccess: boolean, message: any) {
    let opt = null;
    if (isSuccess) {
      opt = {
        message: "You have successfully registered for an account",
        duration: 3000,
        position: 'bottom'
      }
    } else {
      opt = {
        message: message.message,
        duration: 3000,
        position: 'bottom'
      }
    }
    this.toast.create(opt).present();
  }

  // onSubmit(formData) {
  //   if(formData.valid) {
  //     console.log(formData.value);
  //     this.af.auth.createUser({
  //       email: formData.value.email,
  //       password: formData.value.password
  //     }).then(
  //       (success) => {
  //       console.log(success);
  //       this.router.navigate(['/login'])
  //     }).catch(
  //       (err) => {
  //       console.log(err);
  //       this.error = err;
  //     })
  //   }
}
