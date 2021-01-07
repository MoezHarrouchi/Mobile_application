import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartViewPageRoutingModule } from './cart-view-routing.module';

import { CartViewPage } from './cart-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartViewPageRoutingModule
  ],
  declarations: [CartViewPage]
})
export class CartViewPageModule {}
