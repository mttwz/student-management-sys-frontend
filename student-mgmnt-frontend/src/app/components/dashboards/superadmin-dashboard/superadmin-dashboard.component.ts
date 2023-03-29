import { JsonPipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TableService } from 'src/app/services/table/table.service';
import { UserService } from 'src/app/services/user/user.service';
import { SuperadminModalComponent } from '../../modals/superadmin-modal/superadmin-modal.component';
declare var $: any;



@Component({
  selector: 'app-superadmin-dashboard',
  templateUrl: './superadmin-dashboard.component.html',
  styleUrls: ['./superadmin-dashboard.component.css']
})
export class SuperadminDashboardComponent implements OnInit {




  constructor(private userService: UserService, public authService: AuthService, private changeDetection: ChangeDetectorRef, public tableService: TableService) { 

  
  }



  selectedModal!: String;
  isAnyModalActive: Boolean = false;


  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent;
  
  ngOnInit(): void {
    this.tableService.searchAllUsers();
    this.tableService.changeDetectionEmitter.subscribe(
      () => {
        this.changeDetection.detectChanges();
      },
      (err) => {
       console.log(err);
      }
    );
    $(document).on('hidden.bs.modal','#mainModal',  () => {
      
      this.tableService.searchAllUsers();
      
      console.log(this.tableService.allUsers);
      
      
    })
    this.modalFix();

  }

  modalFix() {
    let anoyingBackground = document.getElementsByClassName("modal-backdrop show")[0];
    let anoyingBackground1 = document.getElementsByClassName("modal-backdrop show")[1];
    let anoyingBackground2 = document.getElementsByClassName("modal-open")[0];
    console.log(anoyingBackground2)
    if (anoyingBackground != undefined) {
      anoyingBackground.classList.remove("modal-backdrop");
      anoyingBackground.classList.remove("show");
    } if (anoyingBackground1 != undefined) {
      anoyingBackground1.classList.remove("modal-backdrop");
      anoyingBackground1.classList.remove("show");
    } if (anoyingBackground2 != undefined) {
      anoyingBackground2.classList.remove("modal-open");
    }
  }














}
