import { Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service'
import { WordpressService } from '../../services/wordpress.service';
import { Product } from '../../interfaces/cart';
import { PaymentFormPage } from '../payment-form/payment-form.page'
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
  totalWithDeliv;
  total;
  loading:boolean;
  hiddenForm=false;
  isDelivery:boolean=true;

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
  getLastTotale(){
    if (this.isDelivery){
      this.totalWithDeliv = this.cart.reduce((acc,current)=>acc+current.price*current.qtyCommanded,0) + 4.7;
      return this.totalWithDeliv;
    }else{
      return this.total;
    }

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
  setDelivery(value){
    this.isDelivery= value;
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'AVmo547lzLlL5m2w9PzsuIEpGruiQNvO2EmVUafKcZMVRiU-WEC-UzWoWBiZZl2AMXy2LDaoLCvw8D5-',
        createOrderOnClient: (data) => <ICreateOrderRequest> {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value:this.getTotale().toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: this.getTotale().toString()
                        }
                    }
                },
                items: this.purchaseUnits
            }]
        },
        advanced: {
            commit: 'false'
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


async presentSlide() {
  const modal = await this.modalCtrl.create({
    component:PaymentFormPage ,
    cssClass: 'my-custom-class',
    componentProps:{
      purchaseUnits:this.purchaseUnits,
      paymentMethod:'transfertBank',
      total:this.total
    }
  });
  return await modal.present();
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
