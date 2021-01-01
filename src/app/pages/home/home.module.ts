import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HeaderPage } from '../../components/header/header.page' 
import { HomePageRoutingModule } from './home-routing.module';
import {FooterPage } from '../../components/footer/footer.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,HeaderPage,FooterPage]
})
export class HomePageModule {}
