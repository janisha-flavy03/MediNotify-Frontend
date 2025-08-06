// src/app/restock/restock-log.model.ts
import { Medicine } from '../models/medicine.model';

export interface RestockLog {
  id?: number;
  medicineId: number;
  quantityAdded: number;
  dateRestocked?: Date;
  medicine?: Medicine;
}
