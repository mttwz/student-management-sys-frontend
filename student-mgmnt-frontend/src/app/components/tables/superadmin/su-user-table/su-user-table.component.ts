import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SuperadminDashboardComponent } from '../../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminModalComponent } from '../../../modals/superadmin-modal/superadmin-modal.component';
import { UserService } from 'src/app/services/user/user.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SuperadminTableService } from 'src/app/services/table/superadmin/superadmin-table.service';
declare var $: any;

@Component({
  selector: 'app-su-user-table',
  templateUrl: './su-user-table.component.html',
  styleUrls: ['./su-user-table.component.css']
})
export class UserTableComponent implements OnInit {

  constructor(
    public superadminTableService: SuperadminTableService, 
    public modalService: ModalService, 
    public userService: UserService, 
    public superadminDashboard: SuperadminDashboardComponent, 
    private changeDetection: ChangeDetectorRef) { }

    
  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent;
  ngOnInit(): void {
    this.superadminTableService.searchSuperadmin();
  }

  openUserInfoModal(user:any){
    this.modalService.changeModal('userInfoModal'); 
    this.SuperadminModalComponent.resetStatusCode(); 
    this.userService.currentlySelectedUserId=user.id
    this.userService.currentlySelectedUserName = user.firstName + " " + user.lastName;
  }

  openAddUserModal(){
    this.modalService.changeModal('addUserModal');
    this.SuperadminModalComponent.resetStatusCode();
    
  }

}
