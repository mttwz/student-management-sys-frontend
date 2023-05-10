import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { SuperadminDashboardComponent } from '../../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminModalComponent } from '../../../modals/superadmin-modal/superadmin-modal.component';
import { WorkgroupService } from 'src/app/services/workgroup/workgroup.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SuperadminTableService } from 'src/app/services/table/superadmin/superadmin-table.service';
declare var $: any;

@Component({
  selector: 'app-su-workgroup-table',
  templateUrl: './su-workgroup-table.component.html',
  styleUrls: ['./su-workgroup-table.component.css']
})
export class WorkgroupTableComponent implements OnInit {

  constructor(
    public superadminTableService: SuperadminTableService, 
    public modalService: ModalService, 
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
    this.modalService.changeModal('workgroupInfoModal'); 
    this.SuperadminModalComponent.resetStatusCode()

  }

  openAddUserToWorkgroupModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.modalService.superadminSearchOnlyUsersInModals();
    this.modalService.changeModal('addUserToWorkgroupModal'); 
    this.SuperadminModalComponent.resetStatusCode()


  }

  openRemoverUserFromWorkgroupModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.modalService.superadminSearchOnlyUsersInWorkgroupInModals();
    this.modalService.changeModal('removeUserFromWorkgroupModal'); 
    this.SuperadminModalComponent.resetStatusCode()


  }

  openCreateWorkgroupSceduleModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.modalService.changeModal('createWorkgroupScheduleModal'); 
    this.SuperadminModalComponent.resetStatusCode()
  }

 

  openCreateWorkgroupModal(){
    this.modalService.changeModal('createWorkgroupModal');
    this.SuperadminModalComponent.resetStatusCode();
  }

  openWorkgroupDailyClasses(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.SuperadminModalComponent.allDailyWorkgroupClasses = [];
    this.modalService.changeModal('workgroupDailyClassesMenu');
    this.SuperadminModalComponent.resetStatusCode()
  }
  


}
