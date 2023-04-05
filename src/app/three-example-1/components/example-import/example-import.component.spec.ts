import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleImportComponent } from './example-import.component';

describe('ExampleImportComponent', () => {
  let component: ExampleImportComponent;
  let fixture: ComponentFixture<ExampleImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
