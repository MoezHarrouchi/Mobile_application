import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service'
import { WordpressService } from '../../services/wordpress.service';
import { Product } from '../../interfaces/cart';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.page.html',
  styleUrls: ['./cart-view.page.scss'],
})
export class CartViewPage implements OnInit {
  cart : Product[] =[];

  constructor(private modalCtrl : ModalController, private cartService : CartService,
    private wordPService : WordpressService,private route: Router) { }

  ngOnInit() {
    this.cart = this.cartService.getCart(); 
  }
  decreaseCartItem(product){
    this.cartService.decreaseProduct(product);
  }
  increaseCartItem(product){
    this.cartService.addProduct(product);
  }
  removeCartItem(product){
    this.cartService.removeProduct(product);
  }
  getTotale(){
    return this.cart.reduce((acc,current)=>acc+current.price*current.qtyCommanded,0)
  }
  close(){
    this.modalCtrl.dismiss();
  }
  carddetails(){
    this.close();
    this.route.navigate(['/payments'])
  }

}
