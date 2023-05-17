import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SuperadminDashboardComponent } from '../../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminModalComponent } from '../../../modals/superadmin-modal/superadmin-modal.component';
import { UserService } from 'src/app/services/user/user.service';
import { SuperadminTableService } from 'src/app/services/table/superadmin/superadmin-table.service';
import { SuperadminModalService } from 'src/app/services/modal/superadmin/superadmin-modal.service';
declare var $: any;

@Component({
  selector: 'app-su-admin-table',
  templateUrl: './su-admin-table.component.html',
  styleUrls: ['../../../../../assets/table-style.css','./su-admin-table.component.css']
})
export class AdminTableComponent implements OnInit {

  constructor(
    public superadminTableService: SuperadminTableService, 
    public userService: UserService,
    public superadminModalService: SuperadminModalService, 
    public superadminDashboard: SuperadminDashboardComponent, 
    ) { }


  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent;
  ngOnInit(): void {
    this.superadminTableService.searchSuperadmin();
  }

  openUserInfoModal(user:any){
    this.superadminModalService.changeModal('userInfoModal'); 
    this.userService.currentlySelectedUserId=user.id
    this.userService.currentlySelectedUserName = user.firstName + " " + user.lastName;
    
  }

}
