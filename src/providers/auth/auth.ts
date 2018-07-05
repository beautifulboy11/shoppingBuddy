import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class AuthService {
  private auth: any;
  error: any;
  constructor(public afauth: AngularFireAuth) {
    this.auth = firebase.auth();
  }

  signIn(user: any): Promise<any> {
    return this.afauth.auth.signInWithEmailAndPassword(user.email, user.password)
      .catch(() => { });
  }

  registerUser(email: string, password: string) {
    return this.afauth.auth.createUserWithEmailAndPassword(email, password).then(() => { }).catch(() => { });
  }

  googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    provider.setCustomParameters({ login_hint: "user@example.com" });
    return this.afauth.auth.signInWithPopup(provider).catch(error => { this.handleError(error) });
  }

  facebookSignIn() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("user_birthday");
    provider.setCustomParameters({
      display: "popup"
    });
    return this.afauth.auth.signInWithRedirect(provider).catch(error => {});
  }

  resetPassword(email: string): Promise<any> {
    return this.afauth.auth.sendPasswordResetEmail(email);
  }

  signOut(): Promise<any> {
    return this.afauth.auth.signOut()
  }

  handleError(error: any) {
    var email = error.email;
    if (error.code === "auth/account-exists-with-different-credential") {
      var pendingCred = error.credential;
      email = error.email;
      this.auth.fetchSignInMethodsForEmail(email).then((methods) => {
        if (methods[0] === "password") {
          var password = this.promptUserForPassword();
          this.auth
            .signInWithEmailAndPassword(email, password)
            .then(function (user) {
              return user.link(pendingCred);
            })
            .then(function () {
              this.goToApp();
            });
          return;
        }
      });
    }
  }

  goToApp() {}
  promptUserForPassword() {}
}
