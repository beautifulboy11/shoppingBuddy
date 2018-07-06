import { Component, OnInit, ViewChild } from "@angular/core";
import {
  NavController,
  ModalController,
  IonicPage,
  Slides
} from "ionic-angular";
import { ProductService } from "../../providers/providers";
import { Category } from "../../models/Category";

export interface Item {
  brand: string;
  description: string;
  price: string;
  was: string;
  image: string;
}

export interface Slide {
  title: string;
  description: string;
  image: string;
  link: string;
}

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  @ViewChild("mainslide") slides: Slides;
  isLoading = false;
  promotionBadge = "../../assets/imgs/save.jpg";
  items: Array<any>;
  bannerslide: Slide[];
  ready: boolean;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public productService: ProductService
  ) {
    this.items = [
      {
        class: "banner-img",
        title: "appliances",
        src: "assets/imgs/appliances.png",
        alt: "appliances",
        category: { categoryName: "Appliances", description: "Kitchen and Cooking Appliances" }
      },

      {
        class: "banner-img",
        title: "electronics &amp; entertainment",
        src: "assets/imgs/electronics-entertainment.png",
        alt: "electronics &amp; entertainment",
        category: { categoryName: "Appliances", description: "Kitchen and Cooking Appliances" }
      },

      {
        class: "banner-img",
        title: "cellular &amp; computers",
        src: "assets/imgs/cellular-computers.png",
        alt: "cellular &amp; computers",
        category: { categoryName: "Appliances", description: "Kitchen and Cooking Appliances" }
      },

      {
        class: "banner-img",
        title: "baby &amp; toys",
        src: "assets/imgs/baby-toys.png",
        alt: "baby &amp; toys",
        category: { categoryName: "Baby & Toys", description: "Baby products and play toys" }
      },

      {
        class: "banner-img",
        title: "sports_leisure.png",
        src: "assets/imgs/sports-leisure.png",
        alt: "sports_leisure.png",
        category: { categoryName: "Sports & Leisure", description: "" }
      },

      {
        class: "banner-img",
        title: "diy_auto.png",
        src: "assets/imgs/diy-auto.png",
        alt: "diy_auto.png",
        category: { categoryName: "DIY & Auto", description: "" }

      },

      {
        class: "banner-img",
        title: "home &amp; garden",
        src: "assets/imgs/home-garden.png",
        alt: "home &amp; garden",
        category: { categoryName: "Home & Garden", description: "Decor, Gardening tools, Furniture" }
      },

      {
        class: "banner-img",
        title: "gorceries_household.png",
        src: "assets/imgs/gorceries-household.png",
        alt: "gorceries_household.png",
        category: { categoryName: "Groceries & Household", description: "All household items" }
      },

      {
        class: "banner-img",
        title: "health &amp; beauty",
        src: "assets/imgs/health-beauty.png",
        alt: "health &amp; beauty",
        category: { categoryName: "Health & Beauty", description: "Cosmetics, Jewellery ,Health Care" }
      },

      {
        class: "banner-img",
        title: "liquor",
        src: "assets/imgs/liquor.png",
        alt: "liquor",
        category: { categoryName: "Liquor", description: "Spirits, Wine, Beers & Ciders" }
      }
    ];
    this.bannerslide = [
      {
        description: "",
        title: "",
        link: "",
        image: "assets/imgs/Shoppingbanner.jpg"
      }
    ];
    this.ready = true;
  }

  ngOnInit() { }

  previousSlide() {
    this.slides.slideTo(3, 500);
  }
  nextSlide() {
    this.slides.slideTo(2, 500);
  }
  gotoProducts(category: Category) {
    this.navCtrl.push('ProductsPage', { category: category });
  }

  addCategory() {
    let addModal = this.modalCtrl.create('AddCategoryPage');
    addModal.onDidDismiss(category => {
      if (category) {
        if (category.storeName) {
          this.productService.addStore(category);
        } else {
          this.productService.addCategory(category);
        }
      }
    });
    addModal.present();
  }
}
