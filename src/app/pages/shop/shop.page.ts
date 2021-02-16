import { Component,  ElementRef, OnInit, ViewChild  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartViewPage } from '../cart-view/cart-view.page';
import { CartService } from '../../services/cart.service';
import { WordpressService } from '../../services/wordpress.service';
import { PopoverComponent } from '../../components/popover/popover.component';
import { PopoverController } from '@ionic/angular';




@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})

export class ShopPage implements OnInit {
  @ViewChild('cart',{static: false,read:ElementRef}) fab:ElementRef;

  cart = [];
  products :any;
  cartItemCount :BehaviorSubject<any>;
  loading:boolean=false;


  constructor(private cartService : CartService,private wordpress: WordpressService, private popoverController:PopoverController) { }

  ngOnInit() {
    this.get_products();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();

  }
  async get_products(){
    await this.wordpress.getProducts().subscribe(res => {
      this.products = res;
      this.products.map(el=>el.qtyCommanded=1);
      this.loading = true;
    });

  }
  addToCart(product){
    this.cartService.addProduct(product);
    //this.animateCSS('tada');
  }
  animateCSS(animationNAme,keepAnimated = false){
    const node = this.fab.nativeElement;
    node.classList.add('animated',animationNAme);
    function handleAnimationEnd(){
      if (!keepAnimated){
        node.classList.remove('animated',animationNAme);
      }
      node.removeEventListener('animationend',handleAnimationEnd);
    }
    node.addEventListener('animationend',handleAnimationEnd);
  }
  async presentPopover(ev: any,description){
    const popover = await this.popoverController.create({
      component:PopoverComponent,
      cssClass:'my-custom-class',
      event:ev,
      translucent: true,
      componentProps: {
        description
      }
    });
    return await popover.present();
  }
}
