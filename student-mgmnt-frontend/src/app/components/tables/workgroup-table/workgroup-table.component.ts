import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { SuperadminDashboardComponent } from '../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminModalComponent } from '../../modals/superadmin-modal/superadmin-modal.component';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-workgroup-table',
  templateUrl: './workgroup-table.component.html',
  styleUrls: ['./workgroup-table.component.css']
})
export class WorkgroupTableComponent implements OnInit {

  constructor(
    public tableService: TableService, 
    public superadminDashboard: SuperadminDashboardComponent, 
    private changeDetection: ChangeDetectorRef,
    ) { }
    isUsersListed = false;
    
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


}
