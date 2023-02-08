import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from "@angular/forms"
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup !: FormGroup;
  isLoading: boolean = true;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
   console.log("a")
    this.authService.validateJwt().subscribe(res => {
      this.router.navigate(["dashboard"])
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      
    })

    

    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    
    this.authService.login(this.loginFormGroup);
  }

}
