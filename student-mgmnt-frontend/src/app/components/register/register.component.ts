import { group } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading: boolean = true;
  public registerForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) { }

  async ngOnInit(): Promise<void> {



    this.registerForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      phone: ['', Validators.required],
      birth: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.isLoading = false;


  
  }

  register(){
    this.registerForm.value.birth = this.registerForm.value.birth+"T00:00:00Z";
    this.authService.register(this.registerForm)

  }




 


}




