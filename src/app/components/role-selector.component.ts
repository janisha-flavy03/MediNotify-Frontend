import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.css']
})
export class RoleSelectorComponent {
  constructor(private router: Router) {}

  goToLogin(role: string) {
    this.router.navigate(['/auth/login'], { queryParams: { role } });
  }
}
