import { ChangeDetectorRef, Injectable } from '@angular/core';
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

  constructor(private userService: UserService) { }

  searchAllUsers() {

    this.userService.searchSuperadmin(this.groupName,this.searchFilter,this.searchText,this.pageNumber,this.pageSize,this.sort,this.order).subscribe(res =>{
      this.allUsers = res.userInfoDtoList;
      this.isUsersLoading = false;
      this.allPages = res.allPages;

      
      console.log(this.allUsers);
    },err=>{
      console.log(err)
    })

  }
}
