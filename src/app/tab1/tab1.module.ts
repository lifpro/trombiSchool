import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { RequiredLabelDirective } from '../@common/directives/required-label.directive';
import { PipesModule } from '../@common/pipes/pipes.module';
import { AgePipe } from '../@common/pipes/age.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,

  ],
  declarations: [Tab1Page, RequiredLabelDirective, AgePipe]
})
export class Tab1PageModule { }
