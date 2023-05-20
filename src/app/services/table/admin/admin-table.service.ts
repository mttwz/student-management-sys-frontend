import { EventEmitter, Injectable } from '@angular/core';
import { UserService } from '../../user/user.service';
import { WorkgroupService } from '../../workgroup/workgroup.service';

@Injectable({
  providedIn: 'root'
})
export class AdminTableService {


  //search data
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

  allWorkgroupMemebers !: Array<any>; // sub table
  isWorkgroupMembersListed = false;


  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();
  private timeoutId!: any;

  constructor(private userService: UserService, private workgroupService: WorkgroupService) { }



  //allowed search for admins
  searchAdmin() {
    if (this.searchFilter == "student") {
      this.userService.searchAdmin(this.workgroupService.currentlySelectedWorkgroupId, this.searchFilter, this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
        this.allUsers = res.userInfoDtoList;
        this.isUsersLoading = false;
        this.allPages = res.allPages;
        this.changeDetectionEmitter.emit();
      }, err => {

      })
    } else if (this.searchFilter == "workgroup") {
      this.userService.searchAdmin(this.workgroupService.currentlySelectedWorkgroupId, this.searchFilter, this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
        this.allWorkgroup = res.workgroupDtoList;
        this.isUsersLoading = false;
        this.allPages = res.allPages;
        this.changeDetectionEmitter.emit();
      }, err => {

      })
    } else if (this.searchFilter == 'users-in-workgroup') {

      this.userService.searchAdmin(this.workgroupService.currentlySelectedWorkgroupId, "users-in-workgroup", this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
        this.allWorkgroupMemebers = res.userInfoDtoList;
        this.isUsersLoading = false;
        this.allPages = res.allPages;
        this.changeDetectionEmitter.emit();

      }, err => {

      })
    }

  }

  searchAdminWithDebounce(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.searchAdmin();
    }, 250);
  }

  adGetContentByFilter() {
    if (this.searchFilter == "student") {
      this.searchAdmin();
    } else if (this.searchFilter == "workgroup") {
      this.searchAdmin();
    } else if (this.searchFilter == "users-in-workgroup") {
      this.searchAdmin();
    }
  }

  adPageClick(num: number) {
    this.pageNumber = num;
    this.adGetContentByFilter();
  }

  adSortBy(type: string) {
    if (this.sort == type && this.order == 'asc') {
      this.sort = type;
      this.order = 'desc'
    } else if (this.sort == type && this.order == 'desc') {
      this.sort = type;
      this.order = 'asc'
    }
    this.sort = type;
    this.adGetContentByFilter();

  }

  adminSwitchToWorkgroupMembers(group:any){
    
    this.searchFilter = 'users-in-workgroup';
    this.isWorkgroupMembersListed = true; 
    
    this.searchText = ''; 
    this.workgroupService.currentlySelectedWorkgroupName = group.groupName;
    this.workgroupService.currentlySelectedWorkgroupId = group.id;
    
    this.tempPageNumber = this.pageNumber;
    this.pageNumber = 0;

    this.tempSort = this.sort;
    this.sort = "id";

    
    this.searchAdmin();
    

  }


  adminSwitchToWorkgroups(){

    this.searchFilter = 'workgroup';
    this.searchText = '';
    this.isWorkgroupMembersListed = false;
    this.workgroupService.currentlySelectedWorkgroupName = "";
    this.pageNumber = this.tempPageNumber;

    this.sort = this.tempSort;

    this.searchAdmin(); 
    
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
