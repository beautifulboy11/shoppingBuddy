import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFirestore } from "angularfire2/firestore";
import { Store, Product, Category } from "../models/models";

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

  addStore(store: Store): any {
    var id = this.afs.createId();
    return this.afs.collection('stores').doc(id).set(store);
  }

  addCategory(category: Category): any {
    var id = this.afs.createId();
    return this.afs.collection('categories').doc(id).set(category);
  }

  addProduct(product: Product): any {
    return this.afs.collection<Product>('products').add(product);
  }
}
