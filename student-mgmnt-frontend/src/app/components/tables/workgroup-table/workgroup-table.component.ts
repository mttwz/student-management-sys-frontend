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
    currentComponent = 'workgroup-table';
    
  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent;
  ngOnInit(): void {
    this.tableService.searchAllWorkgroups();
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
