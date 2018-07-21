import { Component, ViewChild, OnInit } from "@angular/core";
import * as firebase from "firebase/app";
import {
  IonicPage,
  NavController,
  ViewController,
  NavParams,
  ToastController
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Category } from '../../providers/models/models';
import { ProductService } from "../../providers/providers";
import { UploadTaskSnapshot } from "@firebase/storage-types";

@IonicPage()
@Component({
  selector: "page-add-item",
  templateUrl: "add-item.html"
})

export class AddItemPage implements OnInit {
  @ViewChild("fileInput") fileInput;
  selectedFiles: FileList;
  error: any;
  file: File;
  url: any;
  public downloadURL: string;
  isReadyToSave: boolean;
  public options: Category[];
  public isprofilePicSet = false;
  public storeoptions: Array<any>;
  category: Category;
  progressPercentage: number;
  productForm: FormGroup;
  public Profile = 'profile0';
  constructor(
    public nCtrl: NavController,
    public tCtrl: ToastController,
    public navParams: NavParams,
    public service: ProductService,
    public vCtrl: ViewController,
    public fb: FormBuilder,
    public camera: Camera
  ) {
    this.category = this.navParams.get("category");
  }

  chooseFiles(event) {
    let reader = new FileReader();
    reader.onload = readerEvent => {
      let imageData = (readerEvent.target as any).result;
      this.productForm.patchValue({ profilePic: imageData });
    };
    this.isprofilePicSet = true;
    reader.readAsDataURL(event.target.files[0]);
    this.selectedFiles = event.target.files;
    this.isprofilePicSet = true;
    if (this.selectedFiles.item(0)) {
      this.uploadpic();
    }
  }

  getPicture() {
    const cameraOptions: CameraOptions = {
      quality: 50,
      allowEdit: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 50,
      targetHeight: 50
    };
    if (Camera["installed"]()) {
      this.camera.getPicture(cameraOptions).then((data) => {
        this.productForm.patchValue({ profilePic: data });
        this.selectedFiles = data;
        this.uploadpic();
      }, (err) => {
        alert("Unable to take photo " + err);
      });
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  uploadpic() {
    let file = this.selectedFiles.item(0);
    let uniqKey = `pic${Math.floor(Math.random() * 100000)}`;
    const storageRef = firebase.storage().ref(`/uploads/${uniqKey}/${file.name}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed',
      (snapshot: UploadTaskSnapshot) => {
        this.progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.changeClass();
      },
      (err) => {
        this.error = err;
      },
      () => {
        storageRef.getDownloadURL().then((url) => {
          console.log('File Path', url)
          this.url = url;
        }).catch((error) => {
          this.handleError(error);
        })
      });
  }

  changeClass(){
    if(this.progressPercentage > 0 && this.progressPercentage <= 20){
      this.Profile = 'profile1';
    }
    if(this.progressPercentage > 20 && this.progressPercentage <= 40){
      this.Profile = 'profile2';
    }
    if(this.progressPercentage > 40 && this.progressPercentage <= 60){
      this.Profile = 'profile3';
    }
    if(this.progressPercentage > 60 && this.progressPercentage <= 80){
      this.Profile = 'profile4';
    }
    if(this.progressPercentage > 80 && this.progressPercentage <= 100){
      this.Profile = 'profile5';
    }
  }

  getProfileImageStyle() {
    return "url(" + this.productForm.controls["profilePic"].value + ")";
  }

  handleError(error: any) {
    switch (error.code) {
      case 'storage/object_not_found':
        break;
      case 'storage/unauthorized':
        this.error = "User doesn't have permission to access the object";
        console.log(this.error)
        break;
      case 'storage/canceled':
        this.error = 'User canceled the upload';
        console.log(this.error)
        break;

      case 'storage/unknown':
        this.error = 'Unknown error occurred, inspect the server response';
        console.log(this.error)
        break;
    }
  }

  ngOnInit() {
    this.createForm();
    this.getCategories();
    this.getStores();
  }

  getStores() {
    this.service.getStores.subscribe(stores => {
      this.storeoptions = stores;
    });
  }

  ionViewDidLoad() {
    if (this.category.categoryName != null) {
      this.productForm.controls["category"].setValue(this.category.categoryName);
    }
  }
  getCategories(): void {
    this.service.getCategories.subscribe(categories => {
      this.options = categories;
    });
  }

  createForm(): void {
    this.productForm = this.fb.group({
      profilePic: [""],
      productName: ["", Validators.required],
      storeName: ["", Validators.compose([Validators.required, Validators.minLength(3)])],
      storePrice: ["", Validators.required],
      category: [""],
      productDescription: [""]
    });
    this.subscribeFormChanges();
  }

  subscribeFormChanges() {
    this.productForm.valueChanges.subscribe(v => {
      this.isReadyToSave = this.productForm.valid;
    });
  }

  rebuildForm() {
    this.productForm.reset();
    this.isprofilePicSet = false;
    if (this.category.categoryName != null) {
      this.productForm.controls["category"].setValue(this.category.categoryName);
    }
  }


  createItem() {
    this.saveProduct();
  }

  cancel() {
    this.vCtrl.dismiss();
  }

  saveProduct() {
    if (!this.productForm.valid) {
      return;
    }
    this.productForm.controls["profilePic"].setValue(this.url);
    var res = this.service.addProduct(this.productForm.value);
    if (res) {
      let toast = this.tCtrl.create({
        message: 'Product added successfully',
        duration: 3000,
        cssClass: 'customtoast',
        position: 'top',
        showCloseButton: true,
        closeButtonText: 'OK'
      });
      toast.onDidDismiss(() => {
        this.rebuildForm();
      });
      toast.present();
    } else { }
  }
}
