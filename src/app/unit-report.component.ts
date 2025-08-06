import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MedicineService } from './services/medicine.service';
import { Medicine } from './models/medicine.model';

@Component({
  selector: 'app-unit-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unit-report.component.html',
  styleUrls: ['./unit-report.component.css']
})
export class UnitReportComponent implements OnInit {
  unit: string = '';
  medicines: Medicine[] = [];

  constructor(
    private route: ActivatedRoute,
    private medicineService: MedicineService
  ) {}

  ngOnInit(): void {
    this.unit = this.route.snapshot.paramMap.get('unit') || '';
    this.fetchMedicinesByUnit();
  }

  fetchMedicinesByUnit(): void {
    this.medicineService.getMedicines().subscribe((meds) => {
      this.medicines = meds.filter(m => m.unit === this.unit);
    });
  }
}
