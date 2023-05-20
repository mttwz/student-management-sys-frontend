import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SuperadminDashboardComponent } from '../../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminModalComponent } from '../../../modals/superadmin-modal/superadmin-modal.component';
import { WorkgroupService } from 'src/app/services/workgroup/workgroup.service';
import { SuperadminTableService } from 'src/app/services/table/superadmin/superadmin-table.service';
import { SuperadminModalService } from 'src/app/services/modal/superadmin/superadmin-modal.service';
declare var $: any;

@Component({
  selector: 'app-su-workgroup-table',
  templateUrl: './su-workgroup-table.component.html',
  styleUrls: ['../../../../../assets/table-style.css', './su-workgroup-table.component.css']
})
export class WorkgroupTableComponent implements OnInit {

  constructor(
    public superadminTableService: SuperadminTableService, 
    public superadminModalService: SuperadminModalService, 
    public workgroupService: WorkgroupService,
    public superadminDashboard: SuperadminDashboardComponent, 
    private changeDetection: ChangeDetectorRef,
    ) { }
    
  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent;
  ngOnInit(): void {
    this.superadminTableService.searchSuperadmin();
    
  }


  openWorkgroupInfoModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.superadminModalService.changeModal('workgroupInfoModal'); 

  }

  openAddUserToWorkgroupModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.superadminModalService.superadminSearchAddableUsersInModals();
    this.superadminModalService.changeModal('addUserToWorkgroupModal'); 


  }

  openRemoverUserFromWorkgroupModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.superadminModalService.superadminSearchOnlyUsersInWorkgroupInModals();
    this.superadminModalService.changeModal('removeUserFromWorkgroupModal'); 


  }

  openCreateWorkgroupSceduleModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.superadminModalService.changeModal('createWorkgroupScheduleModal'); 
  }

 

  openCreateWorkgroupModal(){
    this.superadminModalService.changeModal('createWorkgroupModal');
    
  }

  openWorkgroupDailyClasses(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.SuperadminModalComponent.allDailyWorkgroupClasses = [];
    this.superadminModalService.changeModal('workgroupDailyClassesModal');
    
  }
  


}
