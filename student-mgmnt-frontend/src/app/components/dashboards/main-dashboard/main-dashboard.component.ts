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
    public authService: AuthService, 
    public modalService: ModalService, 
    private router: Router, 
    private http: HttpClient,
    private changeDetection: ChangeDetectorRef, 
    public tableService: TableService,) { }
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
      // console.error(this.tableService.searchFilter);
      
      let jwtData = this.authService.parseJwt();

      if(jwtData.role == "superadmin"){
        this.tableService.searchSuperadmin();
        console.log("superadmin");
      }else if (jwtData.role == "admin"){
        this.tableService.searchAdmin();
        console.log("admin");
      }
      
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
