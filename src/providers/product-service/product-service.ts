import { Injectable } from "@angular/core";
import { Product } from "../../models/Product";
import { Observable } from "rxjs";
import { AngularFirestore } from "angularfire2/firestore";
import { Category } from "../../models/Category";

@Injectable()
export class ProductService {
  constructor(private afs: AngularFirestore) { }

  getProducts(category: Category): Observable<Array<Product>> {
    return this.afs.collection<Product>('products', ref => { return ref.where('category', '==', category.categoryName) }).valueChanges()
  }

  get getCategories(): Observable<Array<Category>> {
    return this.afs.collection<Category>('categories').valueChanges();
  }

  get getStores(): Observable<Array<Category>> {
    return this.afs.collection<any>('stores').valueChanges();
  }


  saveCategory(category: Category): any {
    var id = this.afs.createId();
    return this.afs.collection('categories').doc(id).set(category);
  }

  saveProduct(product: Product): any {
    return this.afs.collection<Product>('products').add(product);
  }
}
