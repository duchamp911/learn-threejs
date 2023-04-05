import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

const routes: Routes = [
  {
    path:'',component:LayoutComponent,
    children:[
      {
        path:'',redirectTo:'ExampleImport',pathMatch:'full',
      },
      {
        path:'ExampleImport',
        loadChildren: () => import('./three-example-1/three-example-1.module').then(m => m.ThreeExample1Module),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
