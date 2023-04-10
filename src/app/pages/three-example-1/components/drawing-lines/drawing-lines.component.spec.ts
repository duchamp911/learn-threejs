import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingLinesComponent } from './drawing-lines.component';

describe('DrawingLinesComponent', () => {
  let component: DrawingLinesComponent;
  let fixture: ComponentFixture<DrawingLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawingLinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
