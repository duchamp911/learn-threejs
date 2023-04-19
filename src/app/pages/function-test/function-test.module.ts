import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FunctionTestRoutingModule } from './function-test-routing.module';
import { CameraTestComponent } from './camera-test/camera-test.component';
import { GuiTestComponent } from './gui-test/gui-test.component';
import { BufferGeometryComponent } from './buffer-geometry/buffer-geometry.component';


@NgModule({
  declarations: [
    CameraTestComponent,
    GuiTestComponent,
    BufferGeometryComponent
  ],
  imports: [
    CommonModule,
    FunctionTestRoutingModule
  ]
})
export class FunctionTestModule { }
