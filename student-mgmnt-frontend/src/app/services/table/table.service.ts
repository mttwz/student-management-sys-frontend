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

























  






}
