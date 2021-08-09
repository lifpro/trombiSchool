import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalisationPage } from './localisation.page';

const routes: Routes = [
  {
    path: '',
    component: LocalisationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalisationPageRoutingModule {}
