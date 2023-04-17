import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTapeComponent } from './test-tape.component';

describe('TestTapeComponent', () => {
  let component: TestTapeComponent;
  let fixture: ComponentFixture<TestTapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTapeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
