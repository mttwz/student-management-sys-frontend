import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { SuperadminDashboardComponent } from '../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminModalComponent } from '../../modals/superadmin-modal/superadmin-modal.component';
declare var $: any;

@Component({
  selector: 'app-workgroup-members-table',
  templateUrl: './workgroup-members-table.component.html',
  styleUrls: ['./workgroup-members-table.component.css']
})
export class WorkgroupMembersTableComponent implements OnInit {



  constructor(
    public tableService: TableService,
    public superadminDashboard: SuperadminDashboardComponent,
    private changeDetection: ChangeDetectorRef) { }


  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent;
  ngOnInit(): void {
    this.tableService.searchAllUsers();
    this.tableService.changeDetectionEmitter.subscribe(
      () => {
        this.changeDetection.detectChanges();
      },
      (err) => {
        console.log(err);
      }
    );
  }


  
}

