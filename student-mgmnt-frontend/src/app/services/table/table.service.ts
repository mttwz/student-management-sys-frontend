import { ApplicationRef, ChangeDetectorRef, EventEmitter, Injectable, ViewChildren } from '@angular/core';
import { UserService } from '../user/user.service';
import { WorkgroupService } from '../workgroup/workgroup.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  isUsersLoading = true;

  //search data
  groupName: string = "";
  searchText: string = "";
  searchFilter: string = "users";
  pageSize: number = 90; // <- erre kikell talalni valamit
  pageNumber: number = 0;
  allPages!: number;
  sort: string = "id";
  order: string = "asc";

  allUsers !: Array<any>;
  allWorkgroup !: Array<any>;
  allWorkgroupMemebers !: Array<any>;
  allWorkgroupScheduleByUserId !: Array<any>;

  constructor(private userService: UserService, public workgroupService: WorkgroupService) { }

  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();

  searchAllUsers() {
    this.userService.searchSuperadmin(this.groupName, this.searchFilter, this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
      this.allUsers = res.userInfoDtoList;
      this.isUsersLoading = false;
      this.allPages = res.allPages;

      this.changeDetectionEmitter.emit();
    }, err => {
      console.log(err)
    })
  }



  searchAllWorkgroups() {
    //http://localhost:8080/api/v1/workgroup/get-all-workgroups?page=0 &size=2 &sort=id,asc

    this.workgroupService.getAllWorkgroup(this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
      this.allWorkgroup = res.workgroupDtoList;
      this.isUsersLoading = false;
      this.allPages = res.allPages;
      this.changeDetectionEmitter.emit();
    }, err => {
      console.log(err)
    })



  }

  searchAllWorkgroupMemebers(groupName: string) {
    this.userService.searchSuperadmin(groupName, "users-in-workgroup", this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
      this.allWorkgroupMemebers = res.userInfoDtoList;
      this.isUsersLoading = false;

      console.log(this.allWorkgroupMemebers);
      this.changeDetectionEmitter.emit();

    }, err => {
      console.log(err)
    })
  }

  getWorkgroupScheduleByUserId(id: number){
    this.workgroupService.getWorkgroupScheduleByUserId(id,this.pageNumber, this.pageSize).subscribe(res => {
      this.allWorkgroupScheduleByUserId = res.workgroupscheduleDtoList;
      this.isUsersLoading = false;

      console.log(res.workgroupscheduleDtoList);
      this.changeDetectionEmitter.emit();
    },err => {
      console.log(err);
    })
  }



  sortBy(type: string) {
    if (this.sort == type && this.order == 'asc') {
      this.sort = type;
      this.order = 'desc'
    } else if (this.sort == type && this.order == 'desc') {
      this.sort = type;
      this.order = 'asc'
    }
    this.sort = type;
    this.getContentByFilter();
    this.searchAllUsers();
  }

  pageClick(num: number) {
    console.log(this.searchFilter)
    this.pageNumber = num;
    this.getContentByFilter();
  }

  createRange() {
    return new Array(this.allPages).fill(0)
      .map((n, index) => index + 1);
  }

  getContentByFilter() {
    if (this.searchFilter == "users") {
      this.searchAllUsers();
    }
    else if (this.searchFilter == "workgroup") {
      this.searchAllWorkgroups();
    }
  }

  changeSearchFilter(filter:string){
    this.searchFilter = filter;
    this.pageNumber = 0;
  }






}
