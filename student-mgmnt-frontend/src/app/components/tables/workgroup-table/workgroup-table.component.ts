import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { SuperadminDashboardComponent } from '../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminModalComponent } from '../../modals/superadmin-modal/superadmin-modal.component';
import { WorkgroupService } from 'src/app/services/workgroup/workgroup.service';
declare var $: any;

@Component({
  selector: 'app-workgroup-table',
  templateUrl: './workgroup-table.component.html',
  styleUrls: ['./workgroup-table.component.css']
})
export class WorkgroupTableComponent implements OnInit {

  constructor(
    public tableService: TableService, 
    public workgroupService: WorkgroupService,
    public superadminDashboard: SuperadminDashboardComponent, 
    private changeDetection: ChangeDetectorRef,
    ) { }

    isUsersListed = false;
    isWorkgroupListed = false;
    
  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent;
  ngOnInit(): void {
    this.tableService.searchSuperadmin();
    
  }



  switchToWorkgroupMembers(groupName:string){
    this.tableService.searchFilter = 'users-in-workgroup';
    this.tableService.groupName = groupName;
    this.isUsersListed = true; 
    this.tableService.searchText = ''; 
    this.tableService.selectedWorkgroup = groupName;
    this.changeDetection.detectChanges();
    this.tableService.searchSuperadmin();
    this.tableService.tempPageNumber = this.tableService.pageNumber;
    this.tableService.pageNumber = 0;

  }

  // switchToWorkgroupSchedule(groupId: number,groupName:string){
  //   this.isWorkgroupListed = true;
  //   this.tableService.selectedWorkgroupId = groupId;
  //   this.tableService.selectedWorkgroup = groupName;
  //   this.tableService.getWorkgroupScheduleByWorkgroupId(groupId);
  //   this.changeDetection.detectChanges();
  //   this.tableService.searchSuperadmin(); 

  // }

  openWorkgroupInfoModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroup = workgroup.id;
    this.superadminDashboard.changeModal('getWorkgroupInfo'); 
    this.SuperadminModalComponent.resetStatusCode()

  }

  openAddUserToWorkgroupModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroup = workgroup.id;
    this.superadminDashboard.changeModal('addUserToWorkgroup'); 
    this.SuperadminModalComponent.resetStatusCode()

  }

  


}
