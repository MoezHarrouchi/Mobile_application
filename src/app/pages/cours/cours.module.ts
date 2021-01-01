import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursPageRoutingModule } from './cours-routing.module';

import { CoursPage } from './cours.page';
import { HeaderPage } from '../../components/header/header.page';
import { FooterPage } from '../../components/footer/footer.page'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursPageRoutingModule
  ],
  declarations: [CoursPage,HeaderPage,FooterPage]
})
export class CoursPageModule {}
