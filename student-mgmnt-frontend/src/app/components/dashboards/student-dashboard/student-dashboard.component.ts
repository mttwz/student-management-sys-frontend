import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  constructor(public tableService:TableService) { }

  ngOnInit(): void {
  }

}
