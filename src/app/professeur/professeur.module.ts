import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesseurPageRoutingModule } from './professeur-routing.module';

import { ProfesseurPage } from './professeur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesseurPageRoutingModule
  ],
  declarations: [ProfesseurPage]
})
export class ProfesseurPageModule {}
