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
import { SuperadminModalComponent } from './components/modals/superadmin-modal/superadmin-modal.component';
import { AdminModalComponent } from './components/modals/admin-modal/admin-modal.component';
import { StudentModalComponent } from './components/modals/student-modal/student-modal.component';
import { RegisterModalComponent } from './components/modals/register-modal/register-modal.component';
import { UserTableComponent } from './components/tables/superadmin/su-user-table/su-user-table.component';
import { WorkgroupTableComponent } from './components/tables/superadmin/su-workgroup-table/su-workgroup-table.component';
import { StudentTableComponent } from './components/tables/superadmin/su-student-table/su-student-table.component';
import { AdminTableComponent } from './components/tables/superadmin/su-admin-table/su-admin-table.component';
import { SuperadminTableComponent } from './components/tables/superadmin/su-superadmin-table/su-superadmin-table.component';
import { WorkgroupMembersTableComponent } from './components/tables/superadmin/su-workgroup-members-table/su-workgroup-members-table.component';
import { AdWorkgroupTableComponent } from './components/tables/admin/ad-workgroup-table/ad-workgroup-table.component';
import { AdWorkgroupMembersTableComponent } from './components/tables/admin/ad-workgroup-members-table/ad-workgroup-members-table.component';
import { AdStudentTableComponent } from './components/tables/admin/ad-student-table/ad-student-table.component';
import { StStudentScheduleTableComponent } from './components/tables/student/st-student-schedule-table/st-student-schedule-table.component';
import { StStudentAttendanceTableComponent } from './components/tables/student/st-student-attendance-table/st-student-attendance-table.component';
import { ActivationComponent } from './components/activation/activation.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SuperadminDashboardComponent,
    AdminDashboardComponent,
    StudentDashboardComponent,
    MainDashboardComponent,
    SuperadminModalComponent,
    AdminModalComponent,
    StudentModalComponent,
    RegisterModalComponent,
    UserTableComponent,
    WorkgroupTableComponent,
    StudentTableComponent,
    AdminTableComponent,
    SuperadminTableComponent,
    WorkgroupMembersTableComponent,
    AdWorkgroupTableComponent,
    AdWorkgroupMembersTableComponent,
    AdStudentTableComponent,
    StStudentScheduleTableComponent,
    StStudentAttendanceTableComponent,
    ActivationComponent,


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
