import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'etudiants',
    loadChildren: () => import('./etudiants/etudiants.module').then(m => m.EtudiantsPageModule)
  },
  {
    path: 'etudiants/:id',
    loadChildren: () => import('./etudiant/etudiant.module').then(m => m.EtudiantPageModule)
  },
  {
    path: 'professeurs',
    loadChildren: () => import('./professeurs/professeurs.module').then(m => m.ProfesseursPageModule)
  },
  {
    path: 'professeurs/:id',
    loadChildren: () => import('./professeur/professeur.module').then(m => m.ProfesseurPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
