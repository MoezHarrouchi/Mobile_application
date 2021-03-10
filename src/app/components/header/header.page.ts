import { Component,  ElementRef, OnInit, ViewChild  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { WordpressService } from '../../services/wordpress.service';
import { CartViewPage } from '../../pages/cart-view/cart-view.page';


@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  @ViewChild('cart',{static: false,read:ElementRef}) fab:ElementRef;
  cartItemCount :BehaviorSubject<any>;

  constructor(private modalController:ModalController,private cartService:CartService,private router:Router) { }

  ngOnInit() {
    this.cartItemCount = this.cartService.getCartItemCount();

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
  async openCart(){
    this.animateCSS('bounceOutLeft',true);
    let modal = await this.modalController.create({
      component: CartViewPage,
      cssClass:'cart-modal'
    });
    modal.onWillDismiss().then(()=>{
      this.fab.nativeElement.classList.remove('animated','bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();

  }
  goToHome(){
   this.router.navigate([""]);
}

}
