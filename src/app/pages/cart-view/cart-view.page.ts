import { Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service'
import { WordpressService } from '../../services/wordpress.service';
import { Product } from '../../interfaces/cart';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.page.html',
  styleUrls: ['./cart-view.page.scss'],
})
export class CartViewPage implements OnInit {
  cart : Product[] =[];
  purchaseUnits :paypalProduct[]=[];
  paymentMethod:string="";
  total;
  loading:boolean;
  hiddenForm=false;

  constructor(private modalCtrl : ModalController, private cartService : CartService,
    private wordPService : WordpressService,private route: Router) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cart.forEach(el=>{
      let product= {
        name : el['name'].toString(),
        quantity: el['qtyCommanded'].toString(),
        category: 'DIGITAL_GOODS',
        unit_amount: {
          currency_code: 'EUR',
          value: el['price'].toString()
        }
      }
      this.purchaseUnits.push(product);
    });
    this.cartService.gethiddenForm().subscribe(res=>{
      this.hiddenForm=res;
    })
    this.cartService.getIsloader().subscribe(res=>{
      this.loading = res;
    });

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
    this.total = this.cart.reduce((acc,current)=>acc+current.price*current.qtyCommanded,0);
    return this.total;
  }
  close(){
    this.modalCtrl.dismiss();
    this.cartService.sethiddenForm(false);
  }
  carddetails(){
    this.close();
    this.route.navigate(['/payments'])
  }
  public payPalConfig ? : IPayPalConfig;

  selectCheckBox(paymentMethod){
    this.paymentMethod = paymentMethod;
  }
}

interface paypalProduct{
  name: String;
  quantity: String,
  category: string,
  unit_amount: {
    currency_code: string,
    value: string
  }
}
