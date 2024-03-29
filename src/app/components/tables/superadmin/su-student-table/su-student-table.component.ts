import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SuperadminDashboardComponent } from '../../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminModalComponent } from '../../../modals/superadmin-modal/superadmin-modal.component';
import { UserService } from 'src/app/services/user/user.service';
import { SuperadminTableService } from 'src/app/services/table/superadmin/superadmin-table.service';
import { SuperadminModalService } from 'src/app/services/modal/superadmin/superadmin-modal.service';
declare var $: any;

@Component({
  selector: 'app-su-student-table',
  templateUrl: './su-student-table.component.html',
  styleUrls: ['../../../../../assets/table-style.css', './su-student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  constructor(
    public superadminTableService: SuperadminTableService, 
    public superadminModalService: SuperadminModalService, 
    public userService: UserService, 
    public superadminDashboard: SuperadminDashboardComponent, 
    private changeDetection: ChangeDetectorRef) { }


  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent;
  ngOnInit(): void {
    this.superadminTableService.searchSuperadmin();
  }

  openStudentDailyAttendanceModal(user:any){
    this.superadminModalService.changeModal('studentAttendanceLogModal'); 
    this.userService.currentlySelectedUserId = user.id;
    this.userService.currentlySelectedUserName = user.firstName + " " + user.lastName;
    
  }

  openStudentInfoModal(user:any){
    this.superadminModalService.changeModal('userInfoModal'); 
    this.userService.currentlySelectedUserId = user.id;
    this.userService.currentlySelectedUserName = user.firstName + " " + user.lastName;
  }

  openStudentDailyClassesModal(user:any){
    this.superadminModalService.changeModal('studentDailyAttendanceModal'); 
    this.userService.currentlySelectedUserId = user.id;
    this.userService.currentlySelectedUserName = user.firstName + " " + user.lastName;
  }

  opencardInfoModal(user:any){
    this.superadminModalService.changeModal('cardInfoModal'); 
    this.userService.currentlySelectedUserId = user.id;
    this.userService.currentlySelectedUserName = user.firstName + " " + user.lastName;
    this.SuperadminModalComponent.getAllAvaliableCard();
    this.SuperadminModalComponent.getCardByUserId();
  }


}


