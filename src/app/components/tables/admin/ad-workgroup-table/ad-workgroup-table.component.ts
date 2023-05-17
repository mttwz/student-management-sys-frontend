import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AdminModalComponent } from '../../../modals/admin-modal/admin-modal.component';
import { WorkgroupService } from 'src/app/services/workgroup/workgroup.service';
import { AdminTableService } from 'src/app/services/table/admin/admin-table.service';
import { AdminModalService } from 'src/app/services/modal/admin/admin-modal.service';
declare var $: any;

@Component({
  selector: 'app-ad-workgroup-table',
  templateUrl: './ad-workgroup-table.component.html',
  styleUrls: ['../../../../../assets/table-style.css','./ad-workgroup-table.component.css']
})
export class AdWorkgroupTableComponent implements OnInit {

  constructor(
    public adminTableService: AdminTableService, 
    public workgroupService: WorkgroupService,
    public adminModalService: AdminModalService, 
    ) { }

  ngOnInit(): void {
    this.adminTableService.searchAdmin();
    
  }
  @ViewChild(AdminModalComponent) AdminModalComponent!: AdminModalComponent;

  openWorkgroupInfoModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.adminModalService.changeModal('workgroupInfoModal'); 
  }

  openAddUserToWorkgroupModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.adminModalService.adminSearchAddableUsersInModals();
    this.adminModalService.changeModal('addUserToWorkgroupModal'); 


  }

  openRemoverUserFromWorkgroupModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.adminModalService.adminSearchOnlyUsersInWorkgroupInModals();
    this.adminModalService.changeModal('removeUserFromWorkgroupModal'); 


  }

  openCreateWorkgroupSceduleModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.adminModalService.changeModal('createWorkgroupScheduleModal'); 
  }

 

  openCreateWorkgroupModal(){
    this.adminModalService.changeModal('createWorkgroupModal');
  }

  openWorkgroupDailyClasses(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.AdminModalComponent.allDailyWorkgroupClasses = [];
    this.adminModalService.changeModal('workgroupDailyClassesModal');
  }
  
}
