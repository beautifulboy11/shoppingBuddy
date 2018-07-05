import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from "../environments/environment";
import { FormsModule } from "@angular/forms";
import { Camera } from "@ionic-native/camera";
import { UploadFileService } from '../providers/providers';
import { ProductService } from '../providers/providers';
import { MyApp } from "./app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from '../components/components.module';
import { AuthService } from '../providers/providers';
import { Keyboard } from "@ionic-native/keyboard";
// import { AuthGuardProvider } from '../providers/auth-guard/auth-guard';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,  
    BrowserAnimationsModule, 
    IonicModule.forRoot(MyApp),
    FormsModule,    
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,    
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    Camera,
    Keyboard,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UploadFileService,
    ProductService,
    AuthService,
    //AuthGuardProvider
  ]
})
export class AppModule { }
