import { JsonPipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { SuperadminModalComponent } from '../../modals/superadmin-modal/superadmin-modal.component';
declare var $: any;



@Component({
  selector: 'app-superadmin-dashboard',
  templateUrl: './superadmin-dashboard.component.html',
  styleUrls: ['./superadmin-dashboard.component.css']
})
export class SuperadminDashboardComponent implements OnInit {




  constructor(private userService: UserService, private authService: AuthService,private changeDetection: ChangeDetectorRef) { 

  
  }

  checkedUsers: Array<Number> = [];
  isLoading: Boolean = true;
  isUsersLoading = true;
  allUsers !: Array<any>;
  isAnyChecked!: Boolean;

  isOrderedById: Boolean = true;
  isOrderedByRole: Boolean = false;
  isOrderedByFirstName: Boolean = false;
  isOrderedByLastName: Boolean = false;
  isOrderedByEmail: Boolean = false;

  groupName:string = "";

  searchText:string = "";
  searchFilter:string = "users";
  pageSize:number = 100;
  pageNumber:number = 0;
  
  sort:string = "id";
  order:string = "asc";

  selectedModal!: String;
  isAnyModalActive: Boolean = false;

  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent;
  
  ngOnInit(): void {
    this.searchAllUsers();

    $(document).on('hidden.bs.modal','#mainModal',  () => {
      
      this.searchAllUsers();
     
      this.SuperadminModalComponent.isEditingEnabled = false;
      

      
    })
    this.modalFix();

  }





  logOut() {
    this.authService.logOut();
  }






  getAllCheckedBox() {
    this.checkedUsers = [];
    let checkboxList = document.getElementsByClassName("subCheckbox");
    for (let i = 0; i < checkboxList.length; i++) {
      let currentCheckbox = checkboxList[i] as HTMLInputElement;
      if (currentCheckbox.checked == true) {
        this.checkedUsers.push(this.allUsers[i].id);
      }
    }
    console.log(this.checkedUsers);
  }

  isAnyCheckedBox() {
    let checkboxList = document.getElementsByClassName("subCheckbox");
    for (let i = 0; i < checkboxList.length; i++) {
      let currentCheckbox = checkboxList[i] as HTMLInputElement;
      if (currentCheckbox.checked == true) {
        this.isAnyChecked = true;
        return;
      }
    }
    this.isAnyChecked = false;
  }

  checkAllBox() {
    let mainCheckbox = document.getElementById("mainCheckbox") as HTMLInputElement;

    let checkboxList = document.getElementsByClassName("subCheckbox");
    for (let i = 0; i < checkboxList.length; i++) {
      let currentCheckbox = checkboxList[i] as HTMLInputElement;
      if (mainCheckbox.checked == true) {
        currentCheckbox.checked = true;
      } else currentCheckbox.checked = false;

    }
    this.isAnyCheckedBox();
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

  sortById(){
    if(this.sort == 'id' && this.order == 'asc'){
      this.sort='id';
      this.order = 'desc'
    }else if(this.sort == 'id' && this.order == 'desc'){
      this.sort='id';
      this.order = 'asc'
    }
    this.sort='id';
    this.searchAllUsers();
  }

  sortByRole(){
    if(this.sort == 'roleId.roleType' && this.order == 'asc'){
      this.sort='roleId.roleType';
      this.order = 'desc'
    }else if(this.sort == 'roleId.roleType' && this.order == 'desc'){
      this.sort='roleId.roleType';
      this.order = 'asc'
    }
    this.sort='roleId.roleType';
    this.searchAllUsers();
  }

  sortByFirstName(){
    if(this.sort == 'firstName' && this.order == 'asc'){
      this.sort='firstName';
      this.order = 'desc'
    }else if(this.sort == 'firstName' && this.order == 'desc'){
      this.sort='firstName';
      this.order = 'asc'
    }
    this.sort='firstName';
    this.searchAllUsers();
  }

  sortByLastName(){
    if(this.sort == 'lastName' && this.order == 'asc'){
      this.sort='lastName';
      this.order = 'desc'
    }else if(this.sort == 'lastName' && this.order == 'desc'){
      this.sort='lastName';
      this.order = 'asc'
    }
    this.sort='lastName';
    this.searchAllUsers();
  }

  sortByEmail(){
    if(this.sort == 'email' && this.order == 'asc'){
      this.sort='email';
      this.order = 'desc'
    }else if(this.sort == 'email' && this.order == 'desc'){
      this.sort='email';
      this.order = 'asc'
    }
    this.sort='email';
    this.searchAllUsers();
  }

  searchAllUsers() {

    this.userService.searchSuperadmin(this.groupName,this.searchFilter,this.searchText,this.pageNumber,this.pageSize,this.sort,this.order).subscribe(res =>{
      this.allUsers = res.userInfoDtoList;
      this.isUsersLoading = false;
      this.changeDetection.detectChanges();
      
      console.log(this.allUsers);
    },err=>{
      console.log(err)
    })

  }







}
