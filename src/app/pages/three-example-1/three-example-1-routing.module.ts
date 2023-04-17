import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleImportComponent } from './components/example-import/example-import.component';
import { DrawingLinesComponent } from './components/drawing-lines/drawing-lines.component';
import { GLTFLoaderComponent } from './components/gltfloader/gltfloader.component';
import { TestTapeComponent } from './components/test-tape/test-tape.component';


const routes: Routes = [
  { path: '', component: ExampleImportComponent },
  { path: 'drawing-lines', component: DrawingLinesComponent },
  { path: 'GLTFLoader', component: GLTFLoaderComponent },
  { path: 'Test', component: TestTapeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreeExample1RoutingModule { }
