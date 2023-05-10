import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SuperadminModalComponent } from '../../modals/superadmin-modal/superadmin-modal.component';
import { SuperadminTableService } from 'src/app/services/table/superadmin/superadmin-table.service';
import { AdminTableService } from 'src/app/services/table/admin/admin-table.service';
import { StudentTableService } from 'src/app/services/table/student/student-table.service';
import { AdminModalService } from 'src/app/services/modal/admin/admin-modal.service';
import { SuperadminModalService } from 'src/app/services/modal/superadmin/superadmin-modal.service';
declare var $: any;

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  constructor(
    public authService: AuthService, 
    public adminModalService: AdminModalService, 
    public superadminModalService: SuperadminModalService, 
    private router: Router, 
    private http: HttpClient,
    private changeDetection: ChangeDetectorRef, 
    public superadminTableService: SuperadminTableService,
    public adminTableService: AdminTableService,
    public studentTableService: StudentTableService) { }
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

    $(document).on('hidden.bs.modal', '.mainModal', () => {
      
      
      let jwtData = this.authService.parseJwt();

      if(jwtData.role == "superadmin"){
        this.superadminTableService.searchSuperadmin();
        console.log("superadmin");
      }else if (jwtData.role == "admin"){
        this.adminTableService.searchAdmin();
        console.log("admin");
      }
      
      this.changeDetection.detectChanges();  
      
      

    })
   
    
    this.superadminTableService.changeDetectionEmitter.subscribe(
      () => {
        
        this.changeDetection.detectChanges();
      
      },
      (err) => {
       console.log(err);
      }
    );

    
    this.adminTableService.changeDetectionEmitter.subscribe(
      () => {
        
        this.changeDetection.detectChanges();
      
      },
      (err) => {
       console.log(err);
      }
    );
    this.studentTableService.changeDetectionEmitter.subscribe(
      () => {
        
        this.changeDetection.detectChanges();
      
      },
      (err) => {
       console.log(err);
      }
    );



    

    this.superadminModalService.changeDetectionEmitter.subscribe(
      () => {
        this.changeDetection.detectChanges();
      },
      (err) => {
       console.log(err);
      }
    );


    this.adminModalService.changeDetectionEmitter.subscribe(
      () => {
        this.changeDetection.detectChanges();
      },
      (err) => {
       console.log(err);
      }
    );
    this.modalFix();
  }

  


    modalFix() {
    let annoyingBackground = document.getElementsByClassName("modal-backdrop show")[0];
    let annoyingBackground1 = document.getElementsByClassName("modal-backdrop show")[1];
    let annoyingBackground2 = document.getElementsByClassName("modal-open")[0];
    if (annoyingBackground != undefined) {
      annoyingBackground.classList.remove("modal-backdrop");
      annoyingBackground.classList.remove("show");
    } if (annoyingBackground1 != undefined) {
      annoyingBackground1.classList.remove("modal-backdrop");
      annoyingBackground1.classList.remove("show");
    } if (annoyingBackground2 != undefined) {
      annoyingBackground2.classList.remove("modal-open");
    }
  }
  
}
