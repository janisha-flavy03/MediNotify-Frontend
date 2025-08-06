import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestockService } from '../services/restock.service';
import { MedicineService } from '../services/medicine.service';
import { RestockLog } from '../models/restock-log.model';
import { Medicine } from '../models/medicine.model';

@Component({
  selector: 'app-restock',
  standalone: true,  // ✅ This is likely enabled in your project
  imports: [CommonModule, FormsModule],  // ✅ ADD THIS LINE
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.css']
})
export class RestockComponent implements OnInit {
  restockLogs: RestockLog[] = [];
  medicines: Medicine[] = [];

  newRestock: RestockLog = {
    medicineId: 0,
    quantityAdded: 0,
    dateRestocked: new Date()
  };

  constructor(
    private restockService: RestockService,
    private medicineService: MedicineService
  ) {}

  ngOnInit(): void {
    this.fetchRestocks();
    this.fetchMedicines();
  }

  fetchRestocks(): void {
    this.restockService.getRestockLogs().subscribe((logs) => {
      this.restockLogs = logs;
    });
  }

  fetchMedicines(): void {
    this.medicineService.getMedicines().subscribe((meds) => {
      this.medicines = meds;
    });
  }

  addRestock(): void {
    this.restockService.addRestockLog(this.newRestock).subscribe(() => {
      this.fetchRestocks();
      this.newRestock = {
        medicineId: 0,
        quantityAdded: 0,
        dateRestocked: new Date()
      };
    });
  }

  deleteRestock(id: number): void {
    this.restockService.deleteRestockLog(id).subscribe(() => {
      this.fetchRestocks();
    });
  }
}
