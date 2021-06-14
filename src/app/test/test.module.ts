import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { Totot2Component } from './totot2/totot2.component';
import { TototComponent } from './totot/totot.component';


@NgModule({
  declarations: [Totot2Component, TototComponent],
  imports: [
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule { }
