import { EventEmitter, Injectable } from '@angular/core';
import { UserService } from '../../user/user.service';
import { WorkgroupService } from '../../workgroup/workgroup.service';

@Injectable({
  providedIn: 'root'
})
export class SuperadminTableService {

  searchText: string = "";
  searchFilter: string = "users";
  pageSize: number = 10; 
  pageNumber: number = 0;
  tempPageNumber!: number;
  allPages!: number;
  sort: string = "id";
  order: string = "asc";
  tempSort!: string;



  allUsers !: Array<any>;
  isUsersLoading = true;

  allWorkgroup !: Array<any>;
  isWorkgroupLoading = true;

  allWorkgroupMemebers !: Array<any>;
  isWorkgroupMembersListed = false;



  private timeoutId!: any;
  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(private userService:UserService, private workgroupService:WorkgroupService) { }



    //allowed search for superadmins
    searchSuperadmin() {
      if (this.searchFilter == "users") {
        this.userService.searchSuperadmin(this.workgroupService.currentlySelectedWorkgroupId, this.searchFilter, this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
          this.allUsers = res.userInfoDtoList;
          this.isUsersLoading = false;
          this.allPages = res.allPages;
          this.changeDetectionEmitter.emit();
        }, err => {

        })
      } else if (this.searchFilter == "student") {
        this.userService.searchSuperadmin(this.workgroupService.currentlySelectedWorkgroupId, this.searchFilter, this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
          this.allUsers = res.userInfoDtoList;
          this.isUsersLoading = false;
          this.allPages = res.allPages;
          this.changeDetectionEmitter.emit();
        }, err => {

        })
      } else if (this.searchFilter == "admin") {
        this.userService.searchSuperadmin(this.workgroupService.currentlySelectedWorkgroupId, this.searchFilter, this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
          this.allUsers = res.userInfoDtoList;
          this.isUsersLoading = false;
          this.allPages = res.allPages;
          this.changeDetectionEmitter.emit();
        }, err => {

        })
      } else if (this.searchFilter == "super-admin") {
        this.userService.searchSuperadmin(this.workgroupService.currentlySelectedWorkgroupId, this.searchFilter, this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
          this.allUsers = res.userInfoDtoList;
          this.isUsersLoading = false;
          this.allPages = res.allPages;
          this.changeDetectionEmitter.emit();
        }, err => {

        })
      } else if (this.searchFilter == "workgroup") {
        this.userService.searchSuperadmin(this.workgroupService.currentlySelectedWorkgroupId, this.searchFilter, this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
          this.allWorkgroup = res.workgroupDtoList;
          this.isUsersLoading = false;
          this.allPages = res.allPages;
          this.changeDetectionEmitter.emit();
        }, err => {

        })
      } else if (this.searchFilter == 'users-in-workgroup') {

        this.userService.searchSuperadmin(this.workgroupService.currentlySelectedWorkgroupId, "users-in-workgroup", this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
          this.allWorkgroupMemebers = res.userInfoDtoList;
          this.isUsersLoading = false;
          this.allPages = res.allPages;

          this.changeDetectionEmitter.emit();
  
        }, err => {

        })
      }
  
    }
  
    searchSuperadminWithDebounce(): void {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.searchSuperadmin();
      }, 250); 
    }


    suGetContentByFilter() {
      if (this.searchFilter == "users") {
        this.searchSuperadmin();
      } else if (this.searchFilter == "student") {
        this.searchSuperadmin();
      } else if (this.searchFilter == "admin") {
        this.searchSuperadmin();
      } else if (this.searchFilter == "super-admin") {
        this.searchSuperadmin();
      } else if (this.searchFilter == "workgroup") {
        this.getAllWorkgroups();
      } else if (this.searchFilter == "users-in-workgroup") {
        this.searchSuperadmin();
      }
    }
    

  getAllWorkgroups() {
    this.workgroupService.getAllWorkgroup(this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
      this.allWorkgroup = res.workgroupDtoList;
      this.isUsersLoading = false;
      this.allPages = res.allPages;
      this.changeDetectionEmitter.emit();
    }, err => {

    })
  }

  suSortBy(type: string) {
    if (this.sort == type && this.order == 'asc') {
      this.sort = type;
      this.order = 'desc'
    } else if (this.sort == type && this.order == 'desc') {
      this.sort = type;
      this.order = 'asc'
    }
    this.sort = type;
    this.suGetContentByFilter();

  }

  suPageClick(num: number) {
    this.pageNumber = num;
    this.suGetContentByFilter();
  }

  superadminSwitchToWorkgroupMembers(group:any){
    
    this.searchFilter = 'users-in-workgroup';
    this.isWorkgroupMembersListed = true; 
    
    this.searchText = ''; 
    this.workgroupService.currentlySelectedWorkgroupName = group.groupName;
    this.workgroupService.currentlySelectedWorkgroupId = group.id;
    
    this.tempPageNumber = this.pageNumber;
    this.pageNumber = 0;

    this.tempSort = this.sort;
    this.sort = "id";

    
    this.searchSuperadmin();
    

  }

  superadminSwitchToWorkgroups(){

    this.searchFilter = 'workgroup';
    this.searchText = '';
    this.isWorkgroupMembersListed = false;
    this.workgroupService.currentlySelectedWorkgroupName = "";
    this.pageNumber = this.tempPageNumber;

    this.sort = this.tempSort;

    this.searchSuperadmin(); 
    
  }

  createRange() {
    if (this.allPages == 0) {
      return [1];

    }
    return new Array(this.allPages).fill(0)
      .map((n, index) => index + 1);
  }


  changeSearchFilter(filter: string) {
    this.searchFilter = filter;
    this.sort = "id"
    this.order = "asc"
    this.pageNumber = 0;
    this.workgroupService.currentlySelectedWorkgroupName = "";
    this.isWorkgroupMembersListed = false;
    
  }

}
