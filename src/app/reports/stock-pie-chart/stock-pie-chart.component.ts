import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-pie-chart',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './stock-pie-chart.component.html',
  styleUrls: ['./stock-pie-chart.component.css']
})
export class StockPieChartComponent implements OnChanges {
  @Input() lowStockCount: number = 0;
  @Input() sufficientStockCount: number = 0;

  public pieChartType: 'pie' = 'pie';

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Low Stock', 'Sufficient Stock'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.pieChartData.datasets[0].data = [
      this.lowStockCount,
      this.sufficientStockCount
    ];
  }
}
