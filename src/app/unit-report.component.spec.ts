import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitReportComponent } from './unit-report.component';

describe('UnitReportComponent', () => {
  let component: UnitReportComponent;
  let fixture: ComponentFixture<UnitReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
