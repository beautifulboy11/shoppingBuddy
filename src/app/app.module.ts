import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { BrowserTab } from '@ionic-native/browser-tab';
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from 'angularfire2/storage';

import { FormsModule } from "@angular/forms";
import { Camera } from "@ionic-native/camera";
import { Keyboard } from "@ionic-native/keyboard";
import { ShoppingApp } from "./app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from '../components/components.module';
import { ProductService, AuthService} from '../providers/providers';
import { environment } from "../providers/environments/environment";

@NgModule({
  declarations: [
    ShoppingApp,
  ],
  imports: [
    BrowserModule,  
    BrowserAnimationsModule, 
    IonicModule.forRoot(ShoppingApp, {preloadModules: true}),
    FormsModule,    
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,    
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ShoppingApp
  ],
  providers: [
    StatusBar,
    Camera,
    Keyboard,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },    
    ProductService,
    AuthService,
    BrowserTab 
  ]
})
export class AppModule { }
