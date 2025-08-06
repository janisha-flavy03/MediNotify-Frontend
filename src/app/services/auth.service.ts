import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7016/api/Auth';

  constructor(private http: HttpClient) {}

  // LOGIN
  login(data: { email: string; password: string }): Observable<any> {
    console.log('AuthService login URL:', `${this.baseUrl}/login`);
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', response.userName || '');

          // 🔐 Extract and store role
          const payload = JSON.parse(atob(response.token.split('.')[1]));
          if (payload.role) {
            localStorage.setItem('role', payload.role);
          }
        }
      })
    );
  }

  // SIGNUP
  signup(data: { name: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  // LOGOUT
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
  }

  // TOKEN
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // IS LOGGED IN
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /** ✅ Get user role from JWT (fallback) */
  getUserRole(): string {
    const token = this.getToken();
    if (!token) return '';

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || '';
    } catch (error) {
      console.error('Invalid JWT token', error);
      return '';
    }
  }

  /** ✅ Primary role getter (from localStorage or token) */
  getRole(): string {
    return localStorage.getItem('role') || this.getUserRole();
  }
}
