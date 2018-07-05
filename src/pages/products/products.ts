import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController } from "ionic-angular";
import { Category } from "../../models/Category";
import { Product } from "../../models/Product";
import { ProductService } from "../../providers/providers";

@IonicPage()
@Component({
  selector: "page-products",
  templateUrl: "products.html"
})
export class ProductsPage implements OnInit {
  selectedItem: any;
  public products: Array<Product> = [];
  public isLoading = false;
  category: Category;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductService,
    public modalCtrl: ModalController,
  ) {
    this.category = this.navParams.get('category');    
  }

  ngOnInit() {
    if(this.category.categoryName == null){
      this.navCtrl.setRoot('TabsPage');
    }
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.productService
      .getProducts(this.category)     
      .subscribe(products => {
        this.products = products;
        this.isLoading = false;
      });
  }

  addProduct() {
    let addModal = this.modalCtrl.create('AddItemPage', { category: this.category });
    addModal.onDidDismiss(product => {
      if (product) {
        this.productService.saveProduct(product);
      }
    });
    addModal.present();
  }

  itemSelected(event, product) {
    this.navCtrl.push('ProductDetailPage', {
      product: product
    });
  }
}
