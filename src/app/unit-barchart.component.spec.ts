import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitBarchartComponent } from './unit-barchart.component';

describe('UnitBarchartComponent', () => {
  let component: UnitBarchartComponent;
  let fixture: ComponentFixture<UnitBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitBarchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
