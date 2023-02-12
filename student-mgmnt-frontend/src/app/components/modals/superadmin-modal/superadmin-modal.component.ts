import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-superadmin-modal',
  templateUrl: './superadmin-modal.component.html',
  styleUrls: ['./superadmin-modal.component.css']
})
export class SuperadminModalComponent implements OnInit {

  @Input() modalId!:String;
  public addUserFormForm !: FormGroup;
  public isSuccessful: any;
  public resStatus!: Number;

  constructor(private formBuilder: FormBuilder,private userService: UserService) { }

  ngOnInit(): void {
    
    this.isSuccessful = null;
    this.addUserFormForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      phone: ['',Validators.required],
      birth: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      role:['',Validators.required]
    })
  }

  submit(myForm: FormGroup)
  {
        console.log(myForm);
  }

  addUser(myForm:FormGroup){
    
    console.log(myForm)
    this.userService.addUser(myForm.value).subscribe(res=>{
     
      
      myForm.reset();
      this.isSuccessful = true;
      this.resStatus = res.status;
      
      
    },err=>{
      this.resStatus = err.status;
     
      this.isSuccessful = false;
      
      
      
    });
  }

}
