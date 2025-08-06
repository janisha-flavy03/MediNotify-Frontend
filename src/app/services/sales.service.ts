import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesLog } from '../models/sales-log.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
 private apiUrl = 'http://localhost:7016/api/SalesLogs';


  constructor(private http: HttpClient) {}

  getSalesLogs(): Observable<SalesLog[]> {
    return this.http.get<SalesLog[]>(this.apiUrl);
  }

  addSalesLog(sale: SalesLog): Observable<SalesLog> {
    return this.http.post<SalesLog>(this.apiUrl, sale);
  }

  deleteSalesLog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
