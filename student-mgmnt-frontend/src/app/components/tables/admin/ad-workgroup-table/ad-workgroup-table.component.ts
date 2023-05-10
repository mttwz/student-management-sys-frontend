import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AdminModalComponent } from '../../../modals/admin-modal/admin-modal.component';
import { WorkgroupService } from 'src/app/services/workgroup/workgroup.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { AdminTableService } from 'src/app/services/table/admin/admin-table.service';
declare var $: any;

@Component({
  selector: 'app-ad-workgroup-table',
  templateUrl: './ad-workgroup-table.component.html',
  styleUrls: ['./ad-workgroup-table.component.css']
})
export class AdWorkgroupTableComponent implements OnInit {

  constructor(
    public adminTableService: AdminTableService, 
    public workgroupService: WorkgroupService,
    public modalService: ModalService, 
    ) { }

  ngOnInit(): void {
    this.adminTableService.searchAdmin();
    
  }
  @ViewChild(AdminModalComponent) AdminModalComponent!: AdminModalComponent;

  openWorkgroupInfoModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.modalService.changeModal('workgroupInfoModal'); 
    this.AdminModalComponent.resetStatusCode()
  }

  openAddUserToWorkgroupModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.modalService.adminSearchOnlyUsersInModals();
    this.modalService.changeModal('addUserToWorkgroupModal'); 
    this.AdminModalComponent.resetStatusCode()


  }

  openRemoverUserFromWorkgroupModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.modalService.adminSearchOnlyUsersInWorkgroupInModals();
    this.modalService.changeModal('removeUserFromWorkgroupModal'); 
    this.AdminModalComponent.resetStatusCode()


  }

  openCreateWorkgroupSceduleModal(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.modalService.changeModal('createWorkgroupScheduleModal'); 
    this.AdminModalComponent.resetStatusCode()
  }

 

  openCreateWorkgroupModal(){
    this.modalService.changeModal('createWorkgroupModal');
    this.AdminModalComponent.resetStatusCode();
  }

  openWorkgroupDailyClasses(workgroup:any){
    this.workgroupService.currentlySelectedWorkgroupId = workgroup.id;
    this.AdminModalComponent.allDailyWorkgroupClasses = [];
    this.modalService.changeModal('workgroupDailyClassesModal');
    this.AdminModalComponent.resetStatusCode()
  }
  
}
