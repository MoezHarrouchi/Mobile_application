import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {HeaderPage} from '../../components/header/header.page'


import { FormationPageRoutingModule } from './formation-routing.module';

import { FormationPage } from './formation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormationPageRoutingModule
  ],
  declarations: [FormationPage,HeaderPage]
})
export class FormationPageModule {}
