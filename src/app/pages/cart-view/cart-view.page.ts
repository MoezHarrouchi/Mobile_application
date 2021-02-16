import { Component, OnInit } from '@angular/core';
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

  constructor(private modalCtrl : ModalController, private cartService : CartService,
    private wordPService : WordpressService,private route: Router) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.initConfig();

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
  public payPalConfig ? : IPayPalConfig;

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'ASsKjrKdoMD62GM1k3ZMhHRCLmTtznXTq-rqxHxZUSMKvLQa7I3TjXPAlMx2rJdRdzLdemxqxTjUDbSC',
        createOrderOnClient: (data) => <ICreateOrderRequest> {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: '5.00',
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: '5.00'
                        }
                    }
                },
                items: [{
                    name: 'Wasserschule',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: '5.00',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical',
            size:"small",
            color:"blue",
            shape:"rect"
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);

        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        },
    };
}

}
