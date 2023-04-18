import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FunctionTestRoutingModule } from './function-test-routing.module';
import { CameraTestComponent } from './camera-test/camera-test.component';


@NgModule({
  declarations: [
    CameraTestComponent
  ],
  imports: [
    CommonModule,
    FunctionTestRoutingModule
  ]
})
export class FunctionTestModule { }
