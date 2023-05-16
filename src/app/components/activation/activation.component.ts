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


  setUserIsActivated() {
    this.authService.setUserIsActivated(this.activationForm).subscribe(res =>{
        console.log(res);
        this.router.navigate(["login"]);
    })
  }



}
