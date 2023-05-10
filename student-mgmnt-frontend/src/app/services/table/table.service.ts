import { ApplicationRef, ChangeDetectorRef, EventEmitter, Injectable, ViewChildren } from '@angular/core';
import { UserService } from '../user/user.service';
import { WorkgroupService } from '../workgroup/workgroup.service';
import { WorkgroupScheduleService } from '../workgroup-schedule/workgroup-schedule.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { WorkgroupTableComponent } from 'src/app/components/tables/superadmin/su-workgroup-table/su-workgroup-table.component';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {


  //loading
  isUserScheduleLoading = true;
  isUsersLoading = true;
  isWorkgroupLoading = true;
  isWorkgroupMembersListed = false;
  isWorkgroupsListed = true;


  //search data
  searchText: string = "";
  searchFilter: string = "users";
  pageSize: number = 1; // <- erre kikell talalni valamit.   mire? itt adod meg hogy hany szar legyen kilistazva 
  pageNumber: number = 0;
  tempPageNumber!: number;
  allPages!: number;
  sort: string = "id";
  order: string = "asc";
  tempSort!: string;

  allUsers !: Array<any>;
  allWorkgroup !: Array<any>;
  allWorkgroupMemebers !: Array<any>; // sub table
  allWorkgroupScheduleByUserId !: Array<any>;
  allUserSchedule !: Array<any>;
  allWorkgroupScheduleByWorkgroupId !: Array<any>;

  allWorkgroupMembersId !: Array<any>;

  dailyAttendance !: Array<any>;

  private timeoutId!: any;




  constructor(private userService: UserService, public workgroupService: WorkgroupService, public workgroupScheduleService: WorkgroupScheduleService) {

  }

  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();








  //allowed search for admins
  searchAdmin() {
    if (this.searchFilter == "student") {
      this.userService.searchAdmin(this.workgroupService.currentlySelectedWorkgroupId, this.searchFilter, this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
        this.allUsers = res.userInfoDtoList;
        this.isUsersLoading = false;
        this.allPages = res.allPages;
        this.changeDetectionEmitter.emit();
      }, err => {
        console.log(err)
      })
    } else if (this.searchFilter == "workgroup") {
      this.userService.searchAdmin(this.workgroupService.currentlySelectedWorkgroupId, this.searchFilter, this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
        this.allWorkgroup = res.workgroupDtoList;
        this.isUsersLoading = false;
        this.allPages = res.allPages;
        this.changeDetectionEmitter.emit();
      }, err => {
        console.log(err)
      })
    } else if (this.searchFilter == 'users-in-workgroup') {
      // console.error(this.groupName);
      this.userService.searchAdmin(this.workgroupService.currentlySelectedWorkgroupId, "users-in-workgroup", this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
        this.allWorkgroupMemebers = res.userInfoDtoList;
        this.isUsersLoading = false;
        this.allPages = res.allPages;
        console.log(this.allWorkgroupMemebers);
        this.changeDetectionEmitter.emit();

      }, err => {
        console.log(err)
      })
    }

  }

  searchAdminWithDebounce(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.searchAdmin();
    }, 250); 
  }



  //
  getAllWorkgroups() {
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

  deleteWorkgroup(id: number) {
    if (confirm("Are you sure you want to delete this workgroup?")) {
      this.workgroupService.deleteWorkgroup(id).subscribe(res => {
        console.log("Workgroup deleted successfully");
      }, err => {
        console.log("Failed to delete workgroup: ", err);
      });
    }

  }



  getWorkgroupScheduleByUserId(id: number) {
    this.workgroupService.getWorkgroupScheduleByUserId(id, this.pageNumber, this.pageSize).subscribe(res => {
      this.allWorkgroupScheduleByUserId = res.workgroupscheduleDtoList;
      this.isUsersLoading = false;
      console.log(res.workgroupscheduleDtoList);
      this.changeDetectionEmitter.emit();
    }, err => {
      console.log(err);
    })
  }



  getOwnUserSchedule() {
    let body = {
      date: "2023-05-09T00:00:00Z"
    };
    this.workgroupService.getOwnUserScheduleWithPaging(body,this.pageNumber,this.pageSize,this.sort,this.order).subscribe(res => {
      this.allUserSchedule = res.userScheduleInfoDtoList;
      this.isUserScheduleLoading = false;
      this.allPages = res.allPages;
      this.changeDetectionEmitter.emit();
    }, err => {
      console.log(err);
    })
  }





  getDailyAttendance(id: number, date: string) {
    let body = {
      userId: id,
      date: date
    };
    this.workgroupScheduleService.getDailyAttendance(body).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })

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



  adPageClick(num: number) {
    console.log(this.searchFilter)
    console.log(this.pageNumber);
    this.pageNumber = num;
    this.adGetContentByFilter();
  }

  stPageClick(num: number) {
    console.log(this.searchFilter)
    console.log(this.pageNumber);
    this.pageNumber = num;
    alert("asd")
    //this.stGetContentByFilter();
  }

  createRange() {
    if (this.allPages == 0) {
      return [1];

    }
    return new Array(this.allPages).fill(0)
      .map((n, index) => index + 1);
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

  changeSearchFilter(filter: string) {
    this.searchFilter = filter;
    this.sort = "id"
    this.order = "asc"
    this.pageNumber = 0;
    this.workgroupService.currentlySelectedWorkgroupName = "";
    this.isWorkgroupMembersListed = false;
    
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



  






}
