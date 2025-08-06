// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
   standalone: true, // 👈 Required for standalone component
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    public authService: AuthService // 🔑 Must be public to access in template
  ) {}

  ngOnInit(): void {}

  goToMedicines() {
    this.router.navigate(['/medicines']);
  }

  goToAvailableMedicines() {
    this.router.navigate(['/available-medicines']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
