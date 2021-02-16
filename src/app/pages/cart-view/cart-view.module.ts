import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartViewPageRoutingModule } from './cart-view-routing.module';

import { CartViewPage } from './cart-view.page';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartViewPageRoutingModule,
    NgxPayPalModule
  ],
  declarations: [CartViewPage]
})
export class CartViewPageModule {}
