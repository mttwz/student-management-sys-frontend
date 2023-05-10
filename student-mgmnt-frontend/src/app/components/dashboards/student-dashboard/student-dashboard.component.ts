import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StudentTableService } from 'src/app/services/table/student/student-table.service';
import { TableService } from 'src/app/services/table/table.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  constructor(public studentTableService:StudentTableService,public authService:AuthService) { }

  ngOnInit(): void {
  }

  

}
