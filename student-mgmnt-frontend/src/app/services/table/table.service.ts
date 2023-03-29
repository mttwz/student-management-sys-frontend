import { ApplicationRef, ChangeDetectorRef, EventEmitter, Injectable, ViewChildren } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  isUsersLoading = true;

  //search data
  groupName:string = "";
  searchText:string = "";
  searchFilter:string = "users";
  pageSize:number = 100;
  pageNumber:number = 0;
  allPages!:number;
  sort:string = "id";
  order:string = "asc";

  allUsers !: Array<any>;
  allWorkgroup !: Array<any>;
  
  constructor(private userService: UserService) { }

  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();

  searchAllUsers() {
    
    this.userService.searchSuperadmin(this.groupName,this.searchFilter,this.searchText,this.pageNumber,this.pageSize,this.sort,this.order).subscribe(res =>{
      this.allUsers = res.userInfoDtoList;
      this.isUsersLoading = false;
      this.allPages = res.allPages;

      this.changeDetectionEmitter.emit();
    },err=>{
      console.log(err)
    })
  }

  searchAllWorkgroups() {
    //http://localhost:8080/api/v1/workgroup/get-all-workgroups?page=0 &size=2 &sort=id,asc

    
    this.userService.getAllWorkgroup(this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
      this.allWorkgroup = res.workgroupDtoList;
      this.isUsersLoading = false;
      this.changeDetectionEmitter.emit();

      console.log("rws 2: " + res.workgroupDtoList);
    }, err => {
      console.log(err)
    })



  }

  // searchAllStudents(){
  //   this.userService.searchSuperadmin(this.groupName,"student",this.searchText,this.pageNumber,this.pageSize,this.sort,this.order).subscribe(res =>{
  //     this.allStudent = res.userInfoDtoList;
  //     this.isUsersLoading = false;
  //     this.allPages = res.allPages;

  //     this.changeDetectionEmitter.emit();
  //   },err=>{
  //     console.log(err)
  //   })
  // }




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

  pageClick(num: number){
    this.pageNumber = num;
    this.searchAllUsers();


  }

  createRange(){
    return new Array(this.allPages).fill(0)
      .map((n, index) => index + 1);
  }



}
