import { Component, OnChanges, OnInit, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { SuperadminModalComponent } from '../../modals/superadmin-modal/superadmin-modal.component';
import { MainDashboardComponent } from '../main-dashboard/main-dashboard.component';
import { WorkgroupService } from 'src/app/services/workgroup/workgroup.service';
import { SuperadminTableService } from 'src/app/services/table/superadmin/superadmin-table.service';
import { SuperadminModalService } from 'src/app/services/modal/superadmin/superadmin-modal.service';
declare var $: any;



@Component({
  selector: 'app-superadmin-dashboard',
  templateUrl: './superadmin-dashboard.component.html',
  styleUrls: ['./superadmin-dashboard.component.css']
})
export class SuperadminDashboardComponent implements OnInit {




  constructor(
    public userService: UserService, 
    public superadminModalService: SuperadminModalService, 
    public workgroupService: WorkgroupService, 
    public authService: AuthService, 
    private changeDetection: ChangeDetectorRef, 
    public superadminTableService: SuperadminTableService,
    public mainDashboard: MainDashboardComponent) { 

  
  }



  //selectedModal!: String;
  id!: number;
  isAnyModalActive: Boolean = false;



  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent;
  
  ngOnInit(): void {
  }




  // changeModal(modalName:string){
  //   this.selectedModal = modalName;
  //   this.changeDetection.detectChanges();
  //   // console.error(this.selectedModal);
  // }

  // openAddUserModal(){
  //   this.modalService.currentlySelectedModal = 'addUserModal' ; 
  //   this.SuperadminModalComponent.resetStatusCode()
  // }

  // openAddUserToWorkgroupModal(){
  //   this.modalService.currentlySelectedModal = 'addUserToWorkgroup' ; 
  //   this.tableService.getAllWorkgroups(); 
  //   this.SuperadminModalComponent.resetStatusCode()
  // }

  // openCreateWorkgroupModal(){
  //   this.modalService.currentlySelectedModal = 'createWorkgroupModal'; 
  //   this.SuperadminModalComponent.resetStatusCode()
  // }

  // openCreateWorkgroupSceduleModal(){
  //   this.modalService.currentlySelectedModal = 'createWorkgroupSchedule'; 
  //   this.tableService.getAllWorkgroups(); 
  //   this.SuperadminModalComponent.resetStatusCode()

  // }





}
