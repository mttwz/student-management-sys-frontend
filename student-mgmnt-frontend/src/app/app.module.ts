import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SuperadminDashboardComponent } from './components/dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './components/dashboards/student-dashboard/student-dashboard.component';
import { MainDashboardComponent } from './components/dashboards/main-dashboard/main-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokeninterceptorService } from './services/interceptor/tokeninterceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SuperadminDashboardComponent,
    AdminDashboardComponent,
    StudentDashboardComponent,
    MainDashboardComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,

    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokeninterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
