export interface Medicine {
  id?: number; // Make id optional
  name: string;
  batchNo: string;
  expiryDate: Date;
  quantity: number;
  unit: string;
  minLevel: number;
}
