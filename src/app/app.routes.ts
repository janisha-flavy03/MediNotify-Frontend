import { Routes } from '@angular/router';

// Authentication
import { AuthComponent } from './auth/auth.component';

// Main Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SalesComponent } from './sales/sales.component';
import { ProfileComponent } from './profile/profile.component';

// Guards
import { AuthGuard } from './auth/auth.guard';
import { ManagerGuard } from './auth/manager.guard';

// Medicines
import { MedicinesComponent } from './auth/medicines/medicines.component';
import { AvailableMedicinesComponent } from './components/available-medicines/available-medicines.component';
import { RestockComponent } from './restock/restock.component';
import { ReportsComponent } from './reports/reports.component';
import { RoleSelectorComponent } from './components/role-selector.component';

export const routes: Routes = [

  // 🔐 Authentication
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login.component').then(m => m.LoginComponent)
      }
    ]
  },

  // 📊 Main App Routes
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
  { path: 'medicines', component: MedicinesComponent, canActivate: [AuthGuard] },
  { path: 'available-medicines', component: AvailableMedicinesComponent, canActivate: [AuthGuard] },
  { path: 'sales', component: SalesComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'restock', component: RestockComponent },
  { path: 'reports', component: ReportsComponent },

  // 📄 Table-only View (from Pie Chart)
  {
    path: 'unit-report/:unit',
    loadComponent: () =>
      import('./unit-report.component').then(m => m.UnitReportComponent),
    canActivate: [AuthGuard]
  },

  // 📊 Bar Chart-only View (from Dropdown)
  {
    path: 'unit-barchart/:unit',
    loadComponent: () =>
      import('./unit-barchart.component').then(m => m.UnitBarchartComponent),
    canActivate: [AuthGuard]
  },

  // 👤 Manager-only Routes
  {
    path: 'manager/add-staff',
    loadComponent: () =>
      import('./manager/add-staff/add-staff.component').then(m => m.AddStaffComponent),
    canActivate: [AuthGuard, ManagerGuard]
  },
  {
    path: 'manager/manage-staff',
    loadComponent: () =>
      import('./auth/manage/manage-staff.component').then(m => m.ManageStaffComponent),
    canActivate: [AuthGuard, ManagerGuard]
  },

  // 🚪 Default & Fallback
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];
