import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
declare var $: any;  


@Component({
  selector: 'app-superadmin-modal',
  templateUrl: './superadmin-modal.component.html',
  styleUrls: ['./superadmin-modal.component.css']
})
export class SuperadminModalComponent implements OnInit {

  @Input() modalId!:String;
  public addUserForm !: FormGroup;
  public userInfoForm !: FormGroup;
  public isSuccessful: any;
  public resStatus!: Number;
  userInfo!: any
  isUserInfoLoading: Boolean = true;
  selectedUserId!:Number


  constructor(private formBuilder: FormBuilder,private userService: UserService) { }
  
  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      phone: ['',Validators.required],
      birth: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      role:['',Validators.required]
    })
    this.userInfoForm = this.formBuilder.group({
      id: ['',Validators.required],
      roleName: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      phone: ['',Validators.required],
      birth: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      registeredAt: ['',Validators.required],
      activationCode: ['',Validators.required],
      activatedAt: ['',Validators.required],
      isDeleted: ['',Validators.required],
      deletedAt: ['',Validators.required],
      jwt: ['',Validators.required],
      
    })

   
  }

  getUserInfo(id:Number){

    let body = {
      "id": id
    }
    this.userService.getUserInfo(body).subscribe(res=>{
      this.userInfo = res;
      console.log(res);
      this.isUserInfoLoading = false;
      this.userInfoForm.controls['id'].setValue(this.userInfo.id);
      this.userInfoForm.controls['roleName'].setValue(this.userInfo.roleName);
      this.userInfoForm.controls['firstName'].setValue(this.userInfo.firstName);
      this.userInfoForm.controls['lastName'].setValue(this.userInfo.lastName);
      this.userInfoForm.controls['phone'].setValue(this.userInfo.phone);
      this.userInfoForm.controls['birth'].setValue(this.userInfo.birth);
      this.userInfoForm.controls['email'].setValue(this.userInfo.email);
      this.userInfoForm.controls['password'].setValue(this.userInfo.password);
      this.userInfoForm.controls['registeredAt'].setValue(this.userInfo.registeredAt);
      this.userInfoForm.controls['activationCode'].setValue(this.userInfo.activationCode);
      this.userInfoForm.controls['activatedAt'].setValue(this.userInfo.activatedAt);
      this.userInfoForm.controls['isDeleted'].setValue(this.userInfo.isDeleted);
      this.userInfoForm.controls['deletedAt'].setValue(this.userInfo.deletedAt);
      this.userInfoForm.controls['jwt'].setValue(this.userInfo.jwt);


    },err=>{
      console.log(err);
    });
    
  }



  addUser(myForm:FormGroup){
    
    this.userService.addUser(myForm.value).subscribe(res=>{
      myForm.reset();
      console.log(res.status)
      this.isSuccessful = true;
      this.resStatus = res.status;
      
      
      
    },err=>{
      this.resStatus = err.status;
      this.isSuccessful = false;
    });
  }



  resetStatusCode(){
    this.resStatus = 0;
  }

  


}
