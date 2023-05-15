import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AdminModalComponent } from '../../../modals/admin-modal/admin-modal.component';
import { UserService } from 'src/app/services/user/user.service';
import { AdminTableService } from 'src/app/services/table/admin/admin-table.service';
import { AdminModalService } from 'src/app/services/modal/admin/admin-modal.service';
declare var $: any;

@Component({
  selector: 'app-ad-student-table',
  templateUrl: './ad-student-table.component.html',
  styleUrls: ['../../../../../assets/table-style.css','./ad-student-table.component.css']
})
export class AdStudentTableComponent implements OnInit {

  constructor( 
    public adminTableService: AdminTableService,
    public adminModalService: AdminModalService,
    public userService:UserService 
    ) { }

  ngOnInit(): void {
    this.adminTableService.searchAdmin();
  }

  @ViewChild(AdminModalComponent) AdminModalComponent!: AdminModalComponent;


  openStudentDailyAttendanceModal(user:any){
    this.adminModalService.changeModal('studentAttendanceLogModal'); 
    this.userService.currentlySelectedUserId = user.id;
    this.userService.currentlySelectedUserName = user.firstName + " " + user.lastName;
    this.AdminModalComponent.resetStatusCode();
    
  }

  openStudentInfoModal(user:any){
    this.adminModalService.changeModal('userInfoModal'); 
    this.userService.currentlySelectedUserId = user.id;
    this.userService.currentlySelectedUserName = user.firstName + " " + user.lastName;
    this.AdminModalComponent.resetStatusCode()
  }

  openStudentDailyClassesModal(user:any){
    this.adminModalService.changeModal('studentDailyAttendanceModal'); 
    this.userService.currentlySelectedUserId = user.id;
    this.userService.currentlySelectedUserName = user.firstName + " " + user.lastName;
    this.AdminModalComponent.resetStatusCode()
  }

}
