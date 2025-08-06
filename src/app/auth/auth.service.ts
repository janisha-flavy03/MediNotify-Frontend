import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = 'http://localhost:7016/api/Auth';
  private readonly managerUrl = 'http://localhost:7016/api/manager';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, data).pipe(
      tap((response: any) => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role ?? 'Staff');
        }
      })
    );
  }

  registerStaff(staff: {
    name: string;
    age: number | null;
    contact: string;
    address: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.managerUrl}/add-staff`, staff, {
      headers: this.getAuthHeaders()
    });
  }

  getAllStaff(): Observable<any[]> {
    return this.http.get<any[]>(`${this.managerUrl}/staff`, {
      headers: this.getAuthHeaders()
    });
  }

  updateStaff(id: string, staffData: any): Observable<any> {
    return this.http.put(`${this.managerUrl}/update-staff/${id}`, staffData, {
      headers: this.getAuthHeaders()
    });
  }

  deleteStaff(id: string): Observable<any> {
    return this.http.delete(`${this.managerUrl}/delete-staff/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
