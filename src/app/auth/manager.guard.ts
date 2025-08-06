import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    const role = this.authService.getRole();

    if (token && role === 'Manager') {
      return true;
    }

    // Redirect non-managers to dashboard
    this.router.navigate(['/dashboard']);
    return false;
  }
}
