import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPieChartComponent } from './stock-pie-chart.component';

describe('StockPieChartComponent', () => {
  let component: StockPieChartComponent;
  let fixture: ComponentFixture<StockPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
