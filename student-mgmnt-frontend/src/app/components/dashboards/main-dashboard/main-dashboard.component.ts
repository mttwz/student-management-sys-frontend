import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TableService } from 'src/app/services/table/table.service';
import { SuperadminModalComponent } from '../../modals/superadmin-modal/superadmin-modal.component';
import { ModalService } from 'src/app/services/modal/modal.service';
declare var $: any;

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    public modalService: ModalService, 
    private router: Router, 
    private http: HttpClient,
    private changeDetection: ChangeDetectorRef, 
    public tableService: TableService) { }
  isLoading: Boolean = true;
  currentUserRole!: String;



  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent;

  ngOnInit() {
    this.authService.validateJwt().subscribe(res => {
      if(res == true){
        this.currentUserRole = this.authService.parseJwt().role;
        this.isLoading = false;
      }else this.router.navigate(["login"]);
    }, err => {
      this.router.navigate(["login"]);
    })

    $(document).on('hidden.bs.modal', '#mainModal', () => {
      // console.error(this.tableService.searchFilter);
      
      this.tableService.searchSuperadmin();
      this.changeDetection.detectChanges();  
      
      

    })
   
    
    this.tableService.changeDetectionEmitter.subscribe(
      () => {
        
        this.changeDetection.detectChanges();
      
      },
      (err) => {
       console.log(err);
      }
    );

    this.modalService.changeDetectionEmitter.subscribe(
      () => {
        this.changeDetection.detectChanges();
      },
      (err) => {
       console.log(err);
      }
    );
    
  }
  
}
