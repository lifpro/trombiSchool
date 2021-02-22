import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesseursPageRoutingModule } from './professeurs-routing.module';

import { ProfesseursPage } from './professeurs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesseursPageRoutingModule
  ],
  declarations: [ProfesseursPage]
})
export class ProfesseursPageModule {}
