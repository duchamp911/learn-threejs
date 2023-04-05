import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleImportComponent } from './components/example-import/example-import.component';

const routes: Routes = [
  {path:'',component:ExampleImportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeExample1RoutingModule { }
