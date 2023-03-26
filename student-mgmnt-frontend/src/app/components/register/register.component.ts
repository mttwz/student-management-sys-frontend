import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { ErrorCodes } from 'src/app/enum/error-codes';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegisterModalComponent } from '../modals/register-modal/register-modal.component';
declare var $: any;
declare var bootstrap: any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  @ViewChild(RegisterModalComponent) RegisterModalComponent!: RegisterModalComponent;
  selectedModal!: String;

  isLoading: boolean = true;
  public registerForm !: FormGroup;
  errorCode!: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit() {

    $(document).on('hidden.bs.modal','#mainModal',  () => {
      this.router.navigate(["login"]);
    })

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
    if(this.registerForm.value.birth.length > 0 && !this.registerForm.value.birth.includes("T00:00:00Z")){
      this.registerForm.value.birth = this.registerForm.value.birth+"T00:00:00Z";
    };
    
    this.authService.register(this.registerForm).subscribe(res =>{
     
      this.selectedModal= "successfullPopUp";
      var myModal = new bootstrap.Modal(document.getElementById('mainModal'), "show");
      
      myModal.show();
    },err=>{
      let str: keyof typeof ErrorCodes = err.error.apiError;
      this.errorCode = ErrorCodes[str];
      

      
    })

  }




 


}




