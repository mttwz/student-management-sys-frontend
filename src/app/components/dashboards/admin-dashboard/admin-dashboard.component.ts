import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { WorkgroupService } from 'src/app/services/workgroup/workgroup.service';
import { AdminModalComponent } from '../../modals/admin-modal/admin-modal.component';
import { AdminTableService } from 'src/app/services/table/admin/admin-table.service';
import { AdminModalService } from 'src/app/services/modal/admin/admin-modal.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public authService:AuthService,public adminTableService:AdminTableService, public workgroupService:WorkgroupService, public adminModalService:AdminModalService) { }

  @ViewChild(AdminModalComponent) AdminModalComponent!: AdminModalComponent;

  ngOnInit(): void {
    this.adminTableService.searchFilter = "student"
    
  }

}
