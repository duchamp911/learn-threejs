import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraTestComponent } from './camera-test/camera-test.component';

const routes: Routes = [
  { path: '', component: CameraTestComponent },
  { path: 'camera-test', component: CameraTestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunctionTestRoutingModule { }
