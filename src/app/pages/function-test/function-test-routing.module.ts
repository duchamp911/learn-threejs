import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraTestComponent } from './camera-test/camera-test.component';
import { GuiTestComponent } from './gui-test/gui-test.component';

const routes: Routes = [
  { path: '', component: CameraTestComponent },
  { path: 'camera-test', component: CameraTestComponent },
  { path: 'gui-test', component: GuiTestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunctionTestRoutingModule { }
