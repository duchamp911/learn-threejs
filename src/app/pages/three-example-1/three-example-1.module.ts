import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeExample1RoutingModule } from './three-example-1-routing.module';
import { ExampleImportComponent } from './components/example-import/example-import.component';
import { DrawingLinesComponent } from './components/drawing-lines/drawing-lines.component';
import { GLTFLoaderComponent } from './components/gltfloader/gltfloader.component';
import { TestTapeComponent } from './components/test-tape/test-tape.component';


@NgModule({
  declarations: [
    ExampleImportComponent,
    DrawingLinesComponent,
    GLTFLoaderComponent,
    TestTapeComponent
  ],
  imports: [
    CommonModule,
    ThreeExample1RoutingModule
  ]
})
export class ThreeExample1Module { }
