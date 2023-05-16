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



/**
 * Logs in the user.
 *
 * This method sends a login request to the authentication service using the provided login form group.
 * If the login is successful, it saves the authentication token and navigates the user to the dashboard.
 * If there is an error during the login process, it extracts the error code from the response and assigns it to the errorCode property.
 */
login() {
  // Call the login method of the authService to initiate the login process
  this.authService.login(this.loginFormGroup);

  // Subscribe to the login request observable
  this.authService.login(this.loginFormGroup).subscribe(
    (res) => {
      // If login is successful, save the authentication token
      this.authService.saveToken(res);

      // Navigate the user to the dashboard
      this.router.navigate(["dashboard"]);
    },
    (err) => {
      // If there is an error during login, extract the error code from the response
      let str: keyof typeof ErrorCodes = err.error.apiError;
      this.errorCode = ErrorCodes[str];
    }
  );
}


  //Navigated to the register component.
  register() {
    this.router.navigate(["/register"]);
  }


}
