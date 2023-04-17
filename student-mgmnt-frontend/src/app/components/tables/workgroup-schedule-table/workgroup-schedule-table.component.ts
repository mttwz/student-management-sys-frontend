import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { UserService } from 'src/app/services/user/user.service';
import { SuperadminDashboardComponent } from '../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { WorkgroupTableComponent } from '../workgroup-table/workgroup-table.component';
import { SuperadminModalComponent } from '../../modals/superadmin-modal/superadmin-modal.component';

@Component({
  selector: 'app-workgroup-schedule-table',
  templateUrl: './workgroup-schedule-table.component.html',
  styleUrls: ['./workgroup-schedule-table.component.css']
})
export class WorkgroupScheduleTableComponent implements OnInit {

  constructor(
    public tableService: TableService,
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
    this.tableService.selectedWorkgroup = "";

    this.tableService.searchSuperadmin(); 
    
  }

}
