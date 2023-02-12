import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { SuperadminModalComponent } from '../../modals/superadmin-modal/superadmin-modal.component';


@Component({
  selector: 'app-superadmin-dashboard',
  templateUrl: './superadmin-dashboard.component.html',
  styleUrls: ['./superadmin-dashboard.component.css']
})
export class SuperadminDashboardComponent implements OnInit {

  


  constructor(private userService: UserService,private authService: AuthService) { }
  checkedUsers: Array<Number> = [];
  isLoading: Boolean = true;
  isUsersLoading = true;
  allUsers !: Array<any>;
  isAnyChecked!: Boolean;
 
  isOrderedById:Boolean = true;
  isOrderedByRole:Boolean = false;
  isOrderedByFirstName:Boolean = false;
  isOrderedByLastName:Boolean = false;
  isOrderedByEmail:Boolean = false;

  selectedModal!: String;

  @ViewChild(SuperadminModalComponent) SuperadminModalComponent!: SuperadminModalComponent ; 
  ngOnInit(): void {
    
    this.modalFix()
    this.getAllUser();

  }

  logOut(){
    this.authService.logOut();
  }

  
  


  getAllUser() {
    this.userService.getAllUser().subscribe(res => {
      this.allUsers = res;
      console.log(res)
      this.isUsersLoading = false;
    })
  }

  formatDate(fullDate: String) {

    if (fullDate != null) {
      let date = fullDate.split("T")[0];
      let time = fullDate.split("T")[1].split(".")[0];
      return date + " " + time;
    }
    return "";

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
      }else currentCheckbox.checked = false;
      
    }
    this.isAnyCheckedBox();
  }


  modalFix(){
    let anoyingBackground = document.getElementsByClassName("modal-backdrop show")[0];
    let anoyingBackground1 = document.getElementsByClassName("modal-backdrop show")[1];
    let anoyingBackground2 = document.getElementsByClassName("modal-open")[0];
    console.log(anoyingBackground2)
    if(anoyingBackground!= undefined){
      anoyingBackground.classList.remove("modal-backdrop");
      anoyingBackground.classList.remove("show");
    }if(anoyingBackground1 != undefined){
      anoyingBackground1.classList.remove("modal-backdrop");
      anoyingBackground1.classList.remove("show");
    }if(anoyingBackground2 != undefined){
      anoyingBackground2.classList.remove("modal-open");
    }
  }


  orderById(){
    if(this.isOrderedById== true){
      this.allUsers.reverse();
      this.isOrderedById = false;
    }
    else{
      this.allUsers.sort((a, b) => a.id - b.id);
      this.isOrderedById = true;
    } 
  }
  orderByRole(){
   
    if(this.isOrderedByRole){
      this.allUsers.sort((a, b) => b.roleName.localeCompare(a.roleName));
      this.isOrderedByRole = false;
    }else {
      this.allUsers.sort((a, b) => a.roleName.localeCompare(b.roleName));
      this.isOrderedByRole = true;
    }
    
  }

  orderByFirstName(){
   
    if(this.isOrderedByFirstName){
      this.allUsers.sort((a, b) => b.firstName.localeCompare(a.firstName));
      this.isOrderedByFirstName = false;
    }else {
      this.allUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
      this.isOrderedByFirstName = true;
    }
    
  }


  orderByLastName(){
   
    if(this.isOrderedByLastName){
      this.allUsers.sort((a, b) => b.lastName.localeCompare(a.lastName));
      this.isOrderedByLastName = false;
    }else {
      this.allUsers.sort((a, b) => a.lastName.localeCompare(b.lastName));
      this.isOrderedByLastName = true;
    }
    
  }


  orderByEmail(){
   
    if(this.isOrderedByEmail){
      this.allUsers.sort((a, b) => b.email.localeCompare(a.email));
      this.isOrderedByEmail = false;
    }else {
      this.allUsers.sort((a, b) => a.email.localeCompare(b.email));
      this.isOrderedByEmail = true;
    }
    
  }




  



}
