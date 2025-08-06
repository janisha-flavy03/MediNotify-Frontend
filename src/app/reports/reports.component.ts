import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Router } from '@angular/router';

import { MedicineService } from '../services/medicine.service';
import { Medicine } from '../models/medicine.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NgChartsModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  medicines: Medicine[] = [];
  selectedUnit: string = '';
  availableUnits: string[] = [];

  pieChartType: 'pie' = 'pie';
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{
      label: 'Stock by Category',
      data: [],
      backgroundColor: []
    }]
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index;
        const clickedUnit = this.pieChartData.labels?.[clickedIndex];
        if (clickedUnit) {
          // 🔁 Navigates to Table Page
          this.router.navigate(['/unit-report', clickedUnit]);
        }
      }
    },
    plugins: {
      legend: { position: 'top' }
    }
  };

  constructor(private medicineService: MedicineService, private router: Router) {}

  ngOnInit(): void {
    this.medicineService.getMedicines().subscribe((meds) => {
      this.medicines = meds;
      this.availableUnits = [...new Set(meds.map(m => m.unit))];
      this.preparePieChart();
    });
  }

  // 🔽 Dropdown navigation to Bar Chart page
  onUnitChange(): void {
    if (this.selectedUnit) {
      this.router.navigate(['/unit-barchart', this.selectedUnit]);
    }
  }

  private preparePieChart(): void {
    const unitMap = new Map<string, number>();

    for (let med of this.medicines) {
      unitMap.set(med.unit, (unitMap.get(med.unit) || 0) + med.quantity);
    }

    const labels = Array.from(unitMap.keys());
    const data = Array.from(unitMap.values());

    const pieColors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
      '#9966FF', '#FF9F40', '#B2EBF2', '#DCE775'
    ];

    this.pieChartData = {
      labels,
      datasets: [{
        label: 'Stock by Category',
        data,
        backgroundColor: labels.map((_, i) => pieColors[i % pieColors.length])
      }]
    };
  }
}
