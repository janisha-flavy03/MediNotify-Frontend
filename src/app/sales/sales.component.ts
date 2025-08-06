import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesService } from '../services/sales.service';
import { MedicineService } from '../services/medicine.service';
import { SalesLog } from '../models/sales-log.model';
import { Medicine } from '../models/medicine.model';

@Component({
  standalone: true,
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  imports: [CommonModule, FormsModule] // 👈 Add these
})
export class SalesComponent {
  medicines: Medicine[] = [];
  salesLogs: SalesLog[] = [];
  newSale: SalesLog = { medicineId: 0, quantitySold: 0, dateSold: new Date() };

  constructor(
    private salesService: SalesService,
    private medicineService: MedicineService
  ) {}

  ngOnInit(): void {
    this.loadMedicines();
    this.loadSalesLogs();
  }

  loadMedicines(): void {
    this.medicineService.getMedicines().subscribe(data => this.medicines = data);
  }

  loadSalesLogs(): void {
    this.salesService.getSalesLogs().subscribe(data => this.salesLogs = data);
  }

  addSale(): void {
    this.salesService.addSalesLog(this.newSale).subscribe(() => {
      this.loadSalesLogs();
      this.newSale = { medicineId: 0, quantitySold: 0, dateSold: new Date() };
    });
  }

  deleteSale(id: number): void {
    this.salesService.deleteSalesLog(id).subscribe(() => this.loadSalesLogs());
  }
}
