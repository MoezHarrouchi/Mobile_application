import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartViewPageRoutingModule } from './cart-view-routing.module';

import { CartViewPage } from './cart-view.page';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaymentFormPage } from '../payment-form/payment-form.page'


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CartViewPageRoutingModule,
    NgxPayPalModule
  ],
  declarations: [CartViewPage,PaymentFormPage]
})
export class CartViewPageModule {}
