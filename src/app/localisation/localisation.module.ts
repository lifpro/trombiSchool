import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalisationPageRoutingModule } from './localisation-routing.module';

import { LocalisationPage } from './localisation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalisationPageRoutingModule
  ],
  declarations: [LocalisationPage]
})
export class LocalisationPageModule {}
