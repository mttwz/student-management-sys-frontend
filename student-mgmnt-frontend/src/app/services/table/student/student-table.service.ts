import { EventEmitter, Injectable } from '@angular/core';
import { WorkgroupService } from '../../workgroup/workgroup.service';

@Injectable({
  providedIn: 'root'
})
export class StudentTableService {

  allUserSchedule !: Array<any>;

  pageSize: number = 1; // <- erre kikell talalni valamit.   mire? itt adod meg hogy hany szar legyen kilistazva 
  pageNumber: number = 0;
  sort: string = "id";
  order: string = "asc";
  allPages!: number;

  isUserScheduleLoading = true;



  searchFilter: string = "users";

  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(private workgroupService:WorkgroupService) { }

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

  stPageClick(num: number) {
    console.log(this.searchFilter)
    console.log(this.pageNumber);
    this.pageNumber = num;
    alert("asd")
    this.getOwnUserSchedule();
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


}
