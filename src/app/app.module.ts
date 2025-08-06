import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { AuthComponent } from './auth/auth.component';

//import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// ✅ Restock Module
import { RestockComponent } from './restock/restock.component';

// ✅ Charts
import { NgChartsModule } from 'ng2-charts'; 
import { ReportsComponent } from './reports/reports.component';
import { StockPieChartComponent } from './reports/stock-pie-chart/stock-pie-chart.component';



// ✅ Interceptor
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,   

    DashboardComponent,
    RestockComponent,
     ReportsComponent,               // ✅ Add this
    StockPieChartComponent  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgChartsModule,  
        // ✅ Import ng2-charts
    routes
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
