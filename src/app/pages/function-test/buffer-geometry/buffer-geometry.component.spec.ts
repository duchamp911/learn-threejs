import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BufferGeometryComponent } from './buffer-geometry.component';

describe('BufferGeometryComponent', () => {
  let component: BufferGeometryComponent;
  let fixture: ComponentFixture<BufferGeometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BufferGeometryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BufferGeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
