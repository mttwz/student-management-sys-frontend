import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { SuperadminDashboardComponent } from '../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminModalComponent } from '../../modals/superadmin-modal/superadmin-modal.component';
declare var $: any;

@Component({
  selector: 'app-superadmin-table',
  templateUrl: './superadmin-table.component.html',
  styleUrls: ['./superadmin-table.component.css']
})
export class SuperadminTableComponent implements OnInit {

  constructor(
    public tableService: TableService,
    public superadminDashboard: SuperadminDashboardComponent,
    private changeDetection: ChangeDetectorRef) { }


  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent;
  ngOnInit(): void {
    this.tableService.searchAllUsers();
  
  }
}
