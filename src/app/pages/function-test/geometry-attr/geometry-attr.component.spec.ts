import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeometryAttrComponent } from './geometry-attr.component';

describe('GeometryAttrComponent', () => {
  let component: GeometryAttrComponent;
  let fixture: ComponentFixture<GeometryAttrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeometryAttrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeometryAttrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
