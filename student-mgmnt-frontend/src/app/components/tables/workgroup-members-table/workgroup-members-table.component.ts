import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { SuperadminDashboardComponent } from '../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminModalComponent } from '../../modals/superadmin-modal/superadmin-modal.component';
import { UserService } from 'src/app/services/user/user.service';
import { WorkgroupTableComponent } from '../workgroup-table/workgroup-table.component';
import { WorkgroupService } from 'src/app/services/workgroup/workgroup.service';
import { ModalService } from 'src/app/services/modal/modal.service';
declare var $: any;

@Component({
  selector: 'app-workgroup-members-table',
  templateUrl: './workgroup-members-table.component.html',
  styleUrls: ['./workgroup-members-table.component.css']
})
export class WorkgroupMembersTableComponent implements OnInit {

  selectedWorkgroup!:string;

  constructor(
    public tableService: TableService,
    public modalService: ModalService, 
    public workgroupService: WorkgroupService,
    public userService: UserService,
    public superadminDashboard: SuperadminDashboardComponent,
    private changeDetection: ChangeDetectorRef,
    public workgroupTableComponents: WorkgroupTableComponent) { }


   
  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent;
  ngOnInit(): void {
    
  }



  switchToWorkgroups(){
    this.tableService.searchFilter = 'workgroup';
    this.tableService.searchText = '';
    this.workgroupTableComponents.isUsersListed = false;
    this.workgroupService.currentlySelectedWorkgroupName = "";
    this.tableService.pageNumber = this.tableService.tempPageNumber;

    this.tableService.searchSuperadmin(); 
    
  }

  openStudentDailyClassesModal(user:any){
    this.modalService.changeModal('studentDailyAttendanceMenu'); 
    this.userService.currentlySelectedUserId = user.id;
    this.SuperadminModalComponent.resetStatusCode()
  }
}


