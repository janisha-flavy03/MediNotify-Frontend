import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StockSummary {
  lowStock: number;
  sufficientStock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:7016/api/Dashboard/stock-summary';

  constructor(private http: HttpClient) {}

  getStockSummary(fromDate?: string, toDate?: string): Observable<StockSummary> {
    let params = new HttpParams();
    if (fromDate) params = params.set('from', fromDate);
    if (toDate) params = params.set('to', toDate);
    return this.http.get<StockSummary>(this.apiUrl, { params });
  }
}
