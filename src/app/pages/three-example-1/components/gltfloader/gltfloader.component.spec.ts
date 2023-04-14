import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GLTFLoaderComponent } from './gltfloader.component';

describe('GLTFLoaderComponent', () => {
  let component: GLTFLoaderComponent;
  let fixture: ComponentFixture<GLTFLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GLTFLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GLTFLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
