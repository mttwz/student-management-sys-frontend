import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorCodes } from 'src/app/enum/error-codes';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  public errorEnum = ErrorCodes;

  public activationForm !: FormGroup;

  errorCode!: any;


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    this.activationForm = this.formBuilder.group({
      activationCode: ['', Validators.required],
      password: ['', Validators.required]
    })

  }


  /**
 * Sets the user as activated.
 *
 * This method sends a request to the authentication service to activate the user using the provided activation form.
 * If the activation is successful, it logs the response and navigates the user to the login page.
 */
setUserIsActivated() {

  this.authService.setUserIsActivated(this.activationForm).subscribe(
    res => {
      // Navigate the user to the login page
      this.router.navigate(["login"]);
    }, err =>{
      let str: keyof typeof ErrorCodes = err.error.apiError;
      this.errorCode = ErrorCodes[str];
    }
  );
}



}
