import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'etudiants',
    loadChildren: () => import('./etudiants/etudiants.module').then( m => m.EtudiantsPageModule)
  },
  {
    path: 'professeurs',
    loadChildren: () => import('./professeurs/professeurs.module').then( m => m.ProfesseursPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
