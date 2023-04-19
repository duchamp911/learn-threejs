import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiTestComponent } from './gui-test.component';

describe('GuiTestComponent', () => {
  let component: GuiTestComponent;
  let fixture: ComponentFixture<GuiTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuiTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
