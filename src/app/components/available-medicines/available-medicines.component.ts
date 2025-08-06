import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineService } from '../../services/medicine.service';

@Component({
  selector: 'app-available-medicines',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './available-medicines.component.html',
  styleUrls: ['./available-medicines.component.css']
})
export class AvailableMedicinesComponent implements OnInit {
  medicines: any[] = [];
  lowStockMedicines: any[] = [];

  constructor(private medicineService: MedicineService) {}

  ngOnInit(): void {
    this.loadMedicines();
  }

  loadMedicines(): void {
    this.medicineService.getMedicines().subscribe({
      next: (data) => {
        this.medicines = data || [];
        this.lowStockMedicines = this.medicines.filter(m => m.quantity < m.minLevel);
      },
      error: (err) => console.error('Error fetching medicines:', err)
    });
  }
}
