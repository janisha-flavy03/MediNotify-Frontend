import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-manage-staff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-staff.component.html',
   styleUrls: ['./manage-staff.component.css'] 
})
export class ManageStaffComponent implements OnInit {
  staffList: any[] = [];
  editIndex: number | null = null;
  editData: any = {};

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.fetchStaff();
  }

  fetchStaff() {
    this.auth.getAllStaff().subscribe(data => {
      this.staffList = data;
    });
  }

  enableEdit(index: number) {
    this.editIndex = index;
    this.editData = { ...this.staffList[index] };
  }

  cancelEdit() {
    this.editIndex = null;
    this.editData = {};
  }

  saveEdit() {
    if (!this.editData.id) return;
    this.auth.updateStaff(this.editData.id, this.editData).subscribe(() => {
      this.fetchStaff();
      this.cancelEdit();
    });
  }

  deleteStaff(id: string) {
    if (confirm('Delete this staff?')) {
      this.auth.deleteStaff(id).subscribe(() => this.fetchStaff());
    }
  }
}
