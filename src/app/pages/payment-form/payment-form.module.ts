import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentFormPageRoutingModule } from './payment-form-routing.module';

import { PaymentFormPage } from './payment-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PaymentFormPageRoutingModule
  ],
  declarations: [PaymentFormPage]
})
export class PaymentFormPageModule {}
