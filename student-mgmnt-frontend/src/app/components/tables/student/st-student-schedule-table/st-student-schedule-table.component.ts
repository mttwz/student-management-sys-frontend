import { Component, OnInit } from '@angular/core';
import { StudentTableService } from 'src/app/services/table/student/student-table.service';
import { DateFormatterService } from 'src/app/services/utils/date-formatter.service';

@Component({
  selector: 'app-st-student-schedule-table',
  templateUrl: './st-student-schedule-table.component.html',
  styleUrls: ['./st-student-schedule-table.component.css']
})
export class StStudentScheduleTableComponent implements OnInit {

  constructor(public studentTableService:StudentTableService,public dateUtil:DateFormatterService) { }

  ngOnInit(): void {
    this.studentTableService.getOwnUserSchedule()
  }

}
