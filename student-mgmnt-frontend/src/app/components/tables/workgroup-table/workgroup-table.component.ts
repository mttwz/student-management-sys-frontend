import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { SuperadminDashboardComponent } from '../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminModalComponent } from '../../modals/superadmin-modal/superadmin-modal.component';
import { WorkgroupService } from 'src/app/services/workgroup/workgroup.service';
import { ModalService } from 'src/app/services/modal/modal.service';
declare var $: any;

@Component({
  selector: 'app-workgroup-table',
  templateUrl: './workgroup-table.component.html',
  styleUrls: ['./workgroup-table.component.css']
})
export class WorkgroupTableComponent implements OnInit {

  constructor(
    public tableService: TableService, 
    public modalService: ModalService, 
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
    this.workgroupService.currentlySelectedWorkgroupName = groupName;
    this.changeDetection.detectChanges();
    this.tableService.searchSuperadmin();
    this.tableService.tempPageNumber = this.tableService.pageNumber;
    this.tableService.pageNumber = 0;

  }

  openWorkgroupInfoModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.modalService.changeModal('getWorkgroupInfo'); 
    this.SuperadminModalComponent.resetStatusCode()

  }

  openAddUserToWorkgroupModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.modalService.changeModal('addUserToWorkgroup'); 
    this.SuperadminModalComponent.resetStatusCode()


  }

  openCreateWorkgroupSceduleModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.modalService.changeModal('createWorkgroupSchedule'); 
    this.SuperadminModalComponent.resetStatusCode()
  }

 

  openCreateWorkgroupModal(){
    this.modalService.changeModal('createWorkgroup');
    this.SuperadminModalComponent.resetStatusCode();
  }
  


}
