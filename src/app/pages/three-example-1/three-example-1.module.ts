import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeExample1RoutingModule } from './three-example-1-routing.module';
import { ExampleImportComponent } from './components/example-import/example-import.component';
import { DrawingLinesComponent } from './components/drawing-lines/drawing-lines.component';


@NgModule({
  declarations: [
    ExampleImportComponent,
    DrawingLinesComponent
  ],
  imports: [
    CommonModule,
    ThreeExample1RoutingModule
  ]
})
export class ThreeExample1Module { }
