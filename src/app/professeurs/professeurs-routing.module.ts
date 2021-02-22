import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesseursPage } from './professeurs.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesseursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesseursPageRoutingModule {}
