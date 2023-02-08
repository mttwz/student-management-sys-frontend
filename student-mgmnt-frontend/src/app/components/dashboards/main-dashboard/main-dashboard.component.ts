import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }
  isLoading: Boolean = true;
  currentUserRole!: String;

  ngOnInit() {
    this.authService.validateJwt().subscribe(res => {
      if(res.valid == true){
        this.isLoading = false;
        this.currentUserRole = this.authService.parseJwt().role;
      }else this.router.navigate(["login"]);
    }, err => {
      this.router.navigate(["login"]);
    })
    
    
  }

  

}
