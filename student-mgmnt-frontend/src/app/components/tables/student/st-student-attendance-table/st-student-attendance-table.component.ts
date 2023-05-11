import { Component, OnInit } from '@angular/core';
import { StudentTableService } from 'src/app/services/table/student/student-table.service';
import { DateFormatterService } from 'src/app/services/utils/date-formatter.service';

@Component({
  selector: 'app-st-student-attendance-table',
  templateUrl: './st-student-attendance-table.component.html',
  styleUrls: ['./st-student-attendance-table.component.css', '../../../../../assets/table-style.css']
})
export class StStudentAttendanceTableComponent implements OnInit {

  constructor(public studentTableService:StudentTableService,public dateUtil:DateFormatterService) { }

  ngOnInit(): void {
    this.studentTableService.getOwnDailyAttendance();
  }

}
