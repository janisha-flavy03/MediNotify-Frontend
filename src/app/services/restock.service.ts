// src/app/restock/restock.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestockLog } from '../models/restock-log.model';

@Injectable({
  providedIn: 'root',
})
export class RestockService {
  private apiUrl = 'http://localhost:7016/api/RestockLogs';

  constructor(private http: HttpClient) {}

  getRestockLogs(): Observable<RestockLog[]> {
    return this.http.get<RestockLog[]>(this.apiUrl);
  }

  addRestockLog(log: RestockLog): Observable<RestockLog> {
    return this.http.post<RestockLog>(this.apiUrl, log);
  }

  deleteRestockLog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
