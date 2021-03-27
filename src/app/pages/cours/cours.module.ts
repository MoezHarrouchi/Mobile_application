import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursPageRoutingModule } from './cours-routing.module';

import { CoursPage } from './cours.page';
import { HeaderPage } from '../../components/header/header.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CoursPage, HeaderPage]
})
export class CoursPageModule {}
