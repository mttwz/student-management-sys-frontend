import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { AdminModalComponent } from '../../../modals/admin-modal/admin-modal.component';
import { UserService } from 'src/app/services/user/user.service';
import { ModalService } from 'src/app/services/modal/modal.service';
declare var $: any;

@Component({
  selector: 'app-ad-workgroup-members-table',
  templateUrl: './ad-workgroup-members-table.component.html',
  styleUrls: ['./ad-workgroup-members-table.component.css']
})
export class AdWorkgroupMembersTableComponent implements OnInit {

  constructor(
    public modalService: ModalService, 
    public userService: UserService, 
    public tableService: TableService, 
  ) { }

  @ViewChild(AdminModalComponent) AdminModalComponent!: AdminModalComponent;
  ngOnInit(): void {
  }

  openStudentDailyClassesPerWgModal(user:any){
    this.modalService.changeModal('studentDailyAttendanceInWorkgroupMenu'); 
    this.userService.currentlySelectedUserId = user.id;
    this.AdminModalComponent.resetStatusCode()
  }
}
