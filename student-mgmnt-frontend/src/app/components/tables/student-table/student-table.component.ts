import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { SuperadminDashboardComponent } from '../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminModalComponent } from '../../modals/superadmin-modal/superadmin-modal.component';
import { UserService } from 'src/app/services/user/user.service';
import { ModalService } from 'src/app/services/modal/modal.service';
declare var $: any;

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  constructor(
    public tableService: TableService, 
    public modalService: ModalService, 
    public userService: UserService, 
    public superadminDashboard: SuperadminDashboardComponent, 
    private changeDetection: ChangeDetectorRef) { }


  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent;
  ngOnInit(): void {
    this.tableService.searchSuperadmin();
  }

  openStudentDailyAttendanceModal(user:any){
    this.modalService.changeModal('studentAttendanceMenu'); 
    this.userService.currentlySelectedUserId = user.id;
    this.SuperadminModalComponent.resetStatusCode();
    
  }

  openStudentInfoModal(user:any){
    this.modalService.changeModal('getUserInfo'); 
    this.userService.currentlySelectedUserId = user.id;
    this.SuperadminModalComponent.resetStatusCode()
  }

  openStudentDailyClassesModal(user:any){
    this.modalService.changeModal('studentDailyAttendanceMenu'); 
    this.userService.currentlySelectedUserId = user.id;
    this.SuperadminModalComponent.resetStatusCode()
  }


}


