import { ApplicationRef, ChangeDetectorRef, EventEmitter, Injectable, ViewChildren } from '@angular/core';
import { UserService } from '../user/user.service';
import { WorkgroupService } from '../workgroup/workgroup.service';
import { WorkgroupScheduleService } from '../workgroup-schedule/workgroup-schedule.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  isUsersLoading = true;
  isWorkgroupLoading = true;

  //search data

  searchText: string = "";
  searchFilter: string = "users";
  pageSize: number = 99; // <- erre kikell talalni valamit.   mire? itt adod meg hogy hany szar legyen kilistazva 
  pageNumber: number = 0;
  tempPageNumber!: number;
  allPages!: number;
  sort: string = "id";
  order: string = "asc";

  allUsers !: Array<any>;
  allWorkgroup !: Array<any>;
  allWorkgroupMemebers !: Array<any>; // sub table
  allWorkgroupScheduleByUserId !: Array<any>;
  allWorkgroupScheduleByWorkgroupId !: Array<any>;

  dailyAttendance !: Array<any>;



  constructor(private userService: UserService, public workgroupService: WorkgroupService, public workgroupScheduleService: WorkgroupScheduleService) { }

  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();

  searchSuperadmin() {
    if (this.searchFilter == "users") {
      this.userService.searchSuperadmin(this.workgroupService.currentlySelectedWorkgroupId, this.searchFilter, this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
        this.allUsers = res.userInfoDtoList;
        this.isUsersLoading = false;
        this.allPages = res.allPages;
        this.changeDetectionEmitter.emit();
      }, err => {
        console.log(err)
      })
    } else if (this.searchFilter == "student") {
      this.userService.searchSuperadmin(this.workgroupService.currentlySelectedWorkgroupId, this.searchFilter, this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
        this.allUsers = res.userInfoDtoList;
        this.isUsersLoading = false;
        this.allPages = res.allPages;
        this.changeDetectionEmitter.emit();
      }, err => {
        console.log(err)
      })
    } else if (this.searchFilter == "admin") {
      this.userService.searchSuperadmin(this.workgroupService.currentlySelectedWorkgroupId, this.searchFilter, this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
        this.allUsers = res.userInfoDtoList;
        this.isUsersLoading = false;
        this.allPages = res.allPages;
        this.changeDetectionEmitter.emit();
      }, err => {
        console.log(err)
      })
    } else if (this.searchFilter == "super-admin") {
      this.userService.searchSuperadmin(this.workgroupService.currentlySelectedWorkgroupId, this.searchFilter, this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
        this.allUsers = res.userInfoDtoList;
        this.isUsersLoading = false;
        this.allPages = res.allPages;
        this.changeDetectionEmitter.emit();
      }, err => {
        console.log(err)
      })
    } else if (this.searchFilter == "workgroup") {
      this.userService.searchSuperadmin(this.workgroupService.currentlySelectedWorkgroupId, this.searchFilter, this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
        this.allWorkgroup = res.workgroupDtoList;
        this.isUsersLoading = false;
        this.allPages = res.allPages;
        this.changeDetectionEmitter.emit();
      }, err => {
        console.log(err)
      })
    } else if (this.searchFilter == 'users-in-workgroup') {
      // console.error(this.groupName);
      this.userService.searchSuperadmin(this.workgroupService.currentlySelectedWorkgroupId, "users-in-workgroup", this.searchText, this.pageNumber, this.pageSize, this.sort, this.order).subscribe(res => {
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






  // ha torolve van a wg akkor ne jelenjen meg.
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
    this.searchSuperadmin();
  }

  pageClick(num: number) {
    console.log(this.searchFilter)
    console.log(this.pageNumber);
    this.pageNumber = num;
    this.getContentByFilter();
  }

  createRange() {
    if(this.allPages == 0){
      return [1];
      
    }
    return new Array(this.allPages).fill(0)
      .map((n, index) => index + 1);
  }

  getContentByFilter() {
    if (this.searchFilter == "users") {
      this.searchSuperadmin();
    }else if (this.searchFilter == "student") {
      this.searchSuperadmin();
    }else if (this.searchFilter == "admin") {
      this.searchSuperadmin();
    }else if (this.searchFilter == "super-admin") {
      this.searchSuperadmin();
    }else if (this.searchFilter == "workgroup") {
      this.getAllWorkgroups();
    }else if (this.searchFilter == "users-in-workgroup") {
      this.searchSuperadmin();
    }
  }

  changeSearchFilter(filter: string) {
    this.searchFilter = filter;
    this.pageNumber = 0;
  }






}
