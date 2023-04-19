import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FunctionTestRoutingModule } from './function-test-routing.module';
import { CameraTestComponent } from './camera-test/camera-test.component';
import { GuiTestComponent } from './gui-test/gui-test.component';


@NgModule({
  declarations: [
    CameraTestComponent,
    GuiTestComponent
  ],
  imports: [
    CommonModule,
    FunctionTestRoutingModule
  ]
})
export class FunctionTestModule { }
