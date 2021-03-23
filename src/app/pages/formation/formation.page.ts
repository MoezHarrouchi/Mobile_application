import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { WordpressService } from '../../services/wordpress.service';
import {PopoverController } from '@ionic/angular';
import {PopoverComponent } from '../../components/popover/popover.component'
@Component({
  selector: 'app-formation',
  templateUrl: './formation.page.html',
  styleUrls: ['./formation.page.scss'],
})
export class FormationPage implements OnInit {

  loading= false;
  productImages = [];
  productDescription:string="";
  productName:string="";
  product:any;
  productPrice:string = "";
  
  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }
  }

  constructor(private cartService :CartService, private wordPService:WordpressService,private popoverCtrl:PopoverController) { }

  

  ngOnInit() {
    this.wordPService.getProductByID('992').subscribe(res=>{
      this.productImages = res['images'];
      this.productDescription = res['description'];
      this.productName = res['name'];
      this.productPrice = res.price;
      this.product = res
      this.product["qtyCommanded"]=1;

      this.loading=true;
    })
  }
  increaseCartItem(product){
    this.cartService.addProduct(this.product);
  }

  async presentPopover(ev){
    const popover = await this.popoverCtrl.create({
      component:PopoverComponent,
      cssClass:'popover-class',
      event:ev,
      translucent: true,
      componentProps: {
        description :this.productDescription
      }
    });
    return await popover.present();
  }

}
