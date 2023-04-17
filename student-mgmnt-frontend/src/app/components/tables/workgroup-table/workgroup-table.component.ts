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
  }

  switchToWorkgroupSchedule(groupId: number, groupName :string){
    this.isWorkgroupListed = true;
    
    this.tableService.selectedWorkgroup = groupName;
    
    
    this.changeDetection.detectChanges();
    this.tableService.getWorkgroupScheduleByWorkgroupId(groupId);

  }

  


}
