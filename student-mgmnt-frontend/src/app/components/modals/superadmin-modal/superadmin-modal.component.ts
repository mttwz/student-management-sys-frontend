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

  constructor(private formBuilder: FormBuilder,private userService: UserService) { }
  
  ngOnInit(): void {
    $('#mainModal').on('hidden.bs.modal',  () => {
      this.resStatus = 0;
    })
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
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      phone: ['',Validators.required],
      birth: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      role:['',Validators.required]
    })
  }



  addUser(myForm:FormGroup){
    
    console.log(myForm)
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

  


}
