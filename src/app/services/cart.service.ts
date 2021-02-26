import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';
import { Product } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart =[];
  private cartItemCount = new BehaviorSubject(0);
  private isLoader = new BehaviorSubject<boolean>(false);
  private hiddenForm = new BehaviorSubject<boolean>(false);

  constructor() { }
  sethiddenForm(value){
    this.hiddenForm.next(value);
  }
  gethiddenForm(){
    return this.hiddenForm;
  }

  setLoader(value){
    this.isLoader.next(value);
  }
  getIsloader(){
    return this.isLoader;
  }
  getCart(){
    return this.cart;
  }
  getCartItemCount(){
    return this.cartItemCount;
  }
  addProduct(product:Product){
    let added = false;
    for( let p of this.cart){
      if(p.id === product.id){
        p.qtyCommanded +=1;
        added = true;
        break;
      }
    }
    if(!added){
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
  decreaseProduct(product:Product){
    for(let [index,p]of this.cart.entries()){
      if (p.id === product.id){
        p.qtyCommanded -= 1;
        if (p.qtyCommanded == 0){
          this.cart.splice(index,1);
          product.qtyCommanded = 1;
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value -1 );
  }
  removeProduct(product){
    for(let [index,p]of this.cart.entries()){
        if(p.id == product.id){
          this.cartItemCount.next(this.cartItemCount.value - p.qtyCommanded);
          product.qtyCommanded=1;
          this.cart.splice(index,1);
        }
    }
  }
}
