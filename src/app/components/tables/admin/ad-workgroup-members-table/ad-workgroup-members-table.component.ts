import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AdminModalComponent } from '../../../modals/admin-modal/admin-modal.component';
import { UserService } from 'src/app/services/user/user.service';
import { AdminTableService } from 'src/app/services/table/admin/admin-table.service';
import { AdminModalService } from 'src/app/services/modal/admin/admin-modal.service';
declare var $: any;

@Component({
  selector: 'app-ad-workgroup-members-table',
  templateUrl: './ad-workgroup-members-table.component.html',
  styleUrls: ['../../../../../assets/table-style.css','./ad-workgroup-members-table.component.css']
})
export class AdWorkgroupMembersTableComponent implements OnInit {

  constructor(
    public adminModalService: AdminModalService, 
    public userService: UserService, 
    public adminTableService: AdminTableService, 
  ) { }

  @ViewChild(AdminModalComponent) AdminModalComponent!: AdminModalComponent;
  ngOnInit(): void {
  }

  openStudentDailyClassesPerWgModal(user:any){
    this.adminModalService.changeModal('studentDailyClassesInWorkgroupModal'); 
    this.userService.currentlySelectedUserId = user.id;
    this.userService.currentlySelectedUserName = user.firstName + " " + user.lastName;
  }
}
