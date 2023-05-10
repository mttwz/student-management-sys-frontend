import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';

@Component({
  selector: 'app-st-student-schedule-table',
  templateUrl: './st-student-schedule-table.component.html',
  styleUrls: ['./st-student-schedule-table.component.css']
})
export class StStudentScheduleTableComponent implements OnInit {

  constructor(public tableService:TableService) { }

  ngOnInit(): void {
    this.tableService.getOwnUserSchedule()
  }

}
