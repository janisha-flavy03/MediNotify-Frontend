import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { MedicineService } from './services/medicine.service';
import { Medicine } from './models/medicine.model';

@Component({
  selector: 'app-unit-barchart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './unit-barchart.component.html',
  styleUrls: ['./unit-barchart.component.css']
})
export class UnitBarchartComponent implements OnInit {
  unit: string = '';
  medicines: Medicine[] = [];

  barChartType: 'bar' = 'bar';
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{
      label: 'Quantity',
      data: [],
      backgroundColor: []
    }]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  };

  constructor(
    private route: ActivatedRoute,
    private medicineService: MedicineService
  ) {}

  ngOnInit(): void {
    this.unit = this.route.snapshot.paramMap.get('unit') || '';
    this.medicineService.getMedicines().subscribe((meds) => {
      this.medicines = meds.filter(m => m.unit === this.unit);
      this.prepareBarChart();
    });
  }

  prepareBarChart(): void {
    const labels = this.medicines.map(m => m.name);
    const data = this.medicines.map(m => m.quantity);
    const colors = this.medicines.map(m =>
      m.quantity < m.minLevel ? '#FF6384' : '#36A2EB'
    );

    this.barChartData = {
      labels,
      datasets: [{
        label: 'Quantity',
        data,
        backgroundColor: colors
      }]
    };
  }
}
