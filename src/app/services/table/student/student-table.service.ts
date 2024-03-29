import { EventEmitter, Injectable } from '@angular/core';
import { WorkgroupService } from '../../workgroup/workgroup.service';
import { UserService } from '../../user/user.service';
import { formatDate } from '@angular/common';
import { DateFormatterService } from '../../utils/date-formatter.service';

@Injectable({
  providedIn: 'root'
})
export class StudentTableService {

  allUserSchedule !: Array<any>;
  allUserAttendance !: Array<any>;

  pageSize: number = 10;
  pageNumber: number = 0;
  sort: string = "id";
  order: string = "asc";
  allPages!: number;

  isUserScheduleLoading = true;
  isDailyAttendanceLoading = true;


  selectedDate:string = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  searchFilter: string = "daily-classes";

  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();
  

  constructor(private workgroupService:WorkgroupService,private userService:UserService,private dateUtil:DateFormatterService) { }

  getOwnUserSchedule() {
    let body = {
      date: this.dateUtil.dateFormatterForBackend(this.selectedDate)
    };
    this.workgroupService.getOwnUserScheduleWithPaging(body,this.pageNumber,this.pageSize,this.sort,this.order).subscribe(res => {
      this.allUserSchedule = res.userScheduleInfoDtoList;
      this.isUserScheduleLoading = false;
      this.allPages = res.allPages;
      this.changeDetectionEmitter.emit();
    }, err => {
    })
  }

  stPageClick(num: number) {
    this.pageNumber = num;
    if(this.searchFilter == "daily-classes"){
      this.getOwnUserSchedule();
    }else if (this.searchFilter == "daily-attendance"){
        this.getOwnDailyAttendance();
    }
  }

  getContent(){
    if(this.searchFilter == "daily-classes"){
      this.getOwnUserSchedule();
    }else if (this.searchFilter == "daily-attendance"){
        this.getOwnDailyAttendance();
    }
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

    
  }

  getOwnDailyAttendance(){
    let body = {
      date: this.dateUtil.dateFormatterForBackend(this.selectedDate)
    };
    
    this.userService.getOwnDailyAttendanceWithPaging(body,this.pageNumber,this.pageSize,this.sort,this.order).subscribe(res=>{
        this.allUserAttendance = res.attendanceDtoList;
        this.allPages = res.allPages;
        this.isDailyAttendanceLoading = false;
        this.changeDetectionEmitter.emit();
    })


  }


}
