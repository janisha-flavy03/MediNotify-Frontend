import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // 👈 Import Router
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-add-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent {
  staff = {
    name: '',
    age: null,
    contact: '',
    address: '',
    email: '',
    password: ''
  };

  message = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {} // 👈 Inject Router

  registerStaff() {
    const { name, age, contact, address, email, password } = this.staff;

    if (!name || age === null || !contact || !address || !email || !password) {
      this.error = 'Please fill in all fields.';
      return;
    }

    this.authService.registerStaff(this.staff).subscribe({
      next: (res) => {
        this.message = 'Staff registered successfully!';
        this.error = '';
        this.staff = { name: '', age: null, contact: '', address: '', email: '', password: '' };
      },
      error: (err) => {
        this.error = err.error?.message || 'Registration failed.';
        this.message = '';
      }
    });
  }

  // 👇 Navigate to manage staff
  goToManageStaff() {
    this.router.navigate(['/manager/manage-staff']);
  }
}
