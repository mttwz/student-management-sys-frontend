import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SuperadminDashboardComponent } from '../../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminModalComponent } from '../../../modals/superadmin-modal/superadmin-modal.component';
import { UserService } from 'src/app/services/user/user.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SuperadminTableService } from 'src/app/services/table/superadmin/superadmin-table.service';
declare var $: any;

@Component({
  selector: 'app-su-student-table',
  templateUrl: './su-student-table.component.html',
  styleUrls: ['./su-student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  constructor(
    public superadminTableService: SuperadminTableService, 
    public modalService: ModalService, 
    public userService: UserService, 
    public superadminDashboard: SuperadminDashboardComponent, 
    private changeDetection: ChangeDetectorRef) { }


  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent;
  ngOnInit(): void {
    this.superadminTableService.searchSuperadmin();
  }

  openStudentDailyAttendanceModal(user:any){
    this.modalService.changeModal('studentAttendanceLogModal'); 
    this.userService.currentlySelectedUserId = user.id;
    this.userService.currentlySelectedUserName = user.firstName + " " + user.lastName;
    this.SuperadminModalComponent.resetStatusCode();
    
  }

  openStudentInfoModal(user:any){
    this.modalService.changeModal('userInfoModal'); 
    this.userService.currentlySelectedUserId = user.id;
    this.userService.currentlySelectedUserName = user.firstName + " " + user.lastName;
    this.SuperadminModalComponent.resetStatusCode()
  }

  openStudentDailyClassesModal(user:any){
    this.modalService.changeModal('studentDailyAttendanceModal'); 
    this.userService.currentlySelectedUserId = user.id;
    this.userService.currentlySelectedUserName = user.firstName + " " + user.lastName;
    this.SuperadminModalComponent.resetStatusCode()
  }

  openAssignCardModal(user:any){
    this.modalService.changeModal('assignCardModal'); 
    this.userService.currentlySelectedUserId = user.id;
    this.userService.currentlySelectedUserName = user.firstName + " " + user.lastName;
    this.SuperadminModalComponent.resetStatusCode()
  }


}


