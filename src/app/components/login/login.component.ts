import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from "@angular/forms"
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorCodes } from 'src/app/enum/error-codes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public errorEnum = ErrorCodes;

  loginFormGroup !: FormGroup;
  isLoading: boolean = true;
  errorCode!: any;
  isFailedLogin!: boolean;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.validateJwt().subscribe(res => {
      console.log(res);
      if (res == true) {
        this.router.navigate(["dashboard"])
        this.isLoading = false;
      } else this.isLoading = false;

    }, err => {
      this.isLoading = false;

    })
    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  login() {
    this.authService.login(this.loginFormGroup);
    this.authService.login(this.loginFormGroup).subscribe(res => {
      this.authService.saveToken(res)
      this.router.navigate(["dashboard"]);
    }, err => {
      let str: keyof typeof ErrorCodes = err.error.apiError;
      this.errorCode = ErrorCodes[str];
    });
  }

  register() {
    this.router.navigate(["/register"]);
  }

  test() {
    console.log("aaaa")
  }

}
