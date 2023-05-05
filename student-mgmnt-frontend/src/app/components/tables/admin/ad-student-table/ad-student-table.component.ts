import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { SuperadminDashboardComponent } from '../../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { AdminModalComponent } from '../../../modals/admin-modal/admin-modal.component';
import { UserService } from 'src/app/services/user/user.service';
import { ModalService } from 'src/app/services/modal/modal.service';
declare var $: any;

@Component({
  selector: 'app-ad-student-table',
  templateUrl: './ad-student-table.component.html',
  styleUrls: ['./ad-student-table.component.css']
})
export class AdStudentTableComponent implements OnInit {

  constructor( 
    public tableService: TableService,
    public modalService: ModalService,
    public userService:UserService 
    ) { }

  ngOnInit(): void {
    this.tableService.searchSuperadmin();
  }

  @ViewChild(AdminModalComponent) AdminModalComponent!: AdminModalComponent;


  openStudentDailyAttendanceModal(user:any){
    this.modalService.changeModal('studentAttendanceLogMenu'); 
    this.userService.currentlySelectedUserId = user.id;
    this.AdminModalComponent.resetStatusCode();
    
  }

  openStudentInfoModal(user:any){
    this.modalService.changeModal('userInfoModal'); 
    this.userService.currentlySelectedUserId = user.id;
    this.AdminModalComponent.resetStatusCode()
  }

  openStudentDailyClassesModal(user:any){
    this.modalService.changeModal('studentDailyAttendanceMenu'); 
    this.userService.currentlySelectedUserId = user.id;
    this.AdminModalComponent.resetStatusCode()
  }

}