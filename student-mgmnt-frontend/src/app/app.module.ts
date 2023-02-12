import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { ModalComponent } from './components/modal/modal.component';
import { SuperadminModalComponent } from './components/modals/superadmin-modal/superadmin-modal.component';
import { AdminModalComponent } from './components/modals/admin-modal/admin-modal.component';
import { StudentModalComponent } from './components/modals/student-modal/student-modal.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SuperadminDashboardComponent,
    AdminDashboardComponent,
    StudentDashboardComponent,
    MainDashboardComponent,
    ModalComponent,
    SuperadminModalComponent,
    AdminModalComponent,
    StudentModalComponent,

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
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
