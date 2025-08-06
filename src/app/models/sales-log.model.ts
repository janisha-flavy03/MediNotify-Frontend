
export interface SalesLog {
  id?: number;          // Optional because backend will generate it
  medicineId: number;
  quantitySold: number;
  dateSold: Date;        // Will be converted from string to Date in frontend
}
