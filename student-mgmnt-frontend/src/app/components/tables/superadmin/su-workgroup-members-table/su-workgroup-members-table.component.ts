import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SuperadminDashboardComponent } from '../../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminModalComponent } from '../../../modals/superadmin-modal/superadmin-modal.component';
import { UserService } from 'src/app/services/user/user.service';
import { WorkgroupTableComponent } from '../su-workgroup-table/su-workgroup-table.component';
import { WorkgroupService } from 'src/app/services/workgroup/workgroup.service';
import { SuperadminTableService } from 'src/app/services/table/superadmin/superadmin-table.service';
import { SuperadminModalService } from 'src/app/services/modal/superadmin/superadmin-modal.service';
declare var $: any;

@Component({
  selector: 'app-su-workgroup-members-table',
  templateUrl: './su-workgroup-members-table.component.html',
  styleUrls: ['./su-workgroup-members-table.component.css']
})
export class WorkgroupMembersTableComponent implements OnInit {

  selectedWorkgroup!:string;

  constructor(
    public superadminTableService: SuperadminTableService,
    public superadminModalService: SuperadminModalService,  
    public workgroupService: WorkgroupService,
    public userService: UserService,
    public superadminDashboard: SuperadminDashboardComponent,
    private changeDetection: ChangeDetectorRef,
    public workgroupTableComponents: WorkgroupTableComponent) { }


   
  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent;
  ngOnInit(): void {
    
  }




  openStudentDailyClassesPerWgModal(user:any){
    this.superadminModalService.changeModal('studentDailyAttendanceInWorkgroupModal'); 
    this.userService.currentlySelectedUserId = user.id;
    this.userService.currentlySelectedUserName = user.firstName + " " + user.lastName;
    this.SuperadminModalComponent.resetStatusCode()
  }


}


