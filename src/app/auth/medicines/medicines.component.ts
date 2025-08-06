// src/app/inventory/medicines/medicines.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicineService } from '../../services/medicine.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-medicines',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {
  medicines: any[] = [];
  newMedicine = {
    name: '',
    batchNo: '',
    expiryDate: '',
    quantity: 0,
    unit: '',
    minLevel: 0
  };
  formModel: any = this.newMedicine;
  editMode = false;
  selectedMedicine: any = null;
  role = '';

  constructor(
    private medicineService: MedicineService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMedicines();
    this.role = this.authService.getUserRole();
    this.formModel = this.newMedicine;
  }

  loadMedicines(): void {
    this.medicineService.getMedicines().subscribe({
      next: (data) => (this.medicines = data || []),
      error: (err) => console.error('Error fetching medicines:', err)
    });
  }

  addMedicine(): void {
    if (!this.formModel.name || !this.formModel.batchNo || !this.formModel.expiryDate) {
      alert('Please fill all required fields.');
      return;
    }

    this.medicineService.addMedicine(this.formModel).subscribe({
      next: () => {
        this.resetForm();
        this.loadMedicines();
        alert('Medicine added successfully!');
      },
      error: (err) => alert('Failed to add medicine: ' + err.message)
    });
  }

  editMedicine(med: any): void {
    this.editMode = true;
    this.selectedMedicine = { ...med };
    this.formModel = this.selectedMedicine;
  }

  updateMedicine(): void {
    if (!this.selectedMedicine) return;

    this.medicineService.updateMedicine(this.selectedMedicine.id, this.formModel).subscribe({
      next: () => {
        this.editMode = false;
        this.selectedMedicine = null;
        this.resetForm();
        this.loadMedicines();
        alert('Medicine updated successfully!');
      },
      error: (err) => alert('Update failed: ' + err.message)
    });
  }

  deleteMedicine(id: number): void {
    if (!confirm('Are you sure you want to delete this medicine?')) return;

    this.medicineService.deleteMedicine(id).subscribe({
      next: () => {
        this.loadMedicines();
        alert('Medicine deleted successfully!');
      },
      error: (err) => alert('Delete failed: ' + err.message)
    });
  }

  cancelEdit(): void {
    this.editMode = false;
    this.selectedMedicine = null;
    this.resetForm();
  }

  private resetForm(): void {
    this.newMedicine = {
      name: '',
      batchNo: '',
      expiryDate: '',
      quantity: 0,
      unit: '',
      minLevel: 0
    };
    this.formModel = this.newMedicine;
  }
}
