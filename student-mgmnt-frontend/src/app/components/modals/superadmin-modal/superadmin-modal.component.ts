import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';



@Component({
  selector: 'app-superadmin-modal',
  templateUrl: './superadmin-modal.component.html',
  styleUrls: ['./superadmin-modal.component.css']
})
export class SuperadminModalComponent implements OnInit {

  @Input() modalId!: String;
  public addUserForm !: FormGroup;
  public userInfoForm !: FormGroup;
  public isSuccessful: any;
  public resStatus!: Number;
  userInfo!: any
  isUserInfoLoading: Boolean = true;
  selectedUserId!: Number;
  selectedUserRole!: String;
  isEditingEnabled: Boolean = false;


  constructor(private formBuilder: FormBuilder, private userService: UserService,private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    


    this.addUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      birth: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    })
    this.userInfoForm = this.formBuilder.group({
      id: ['', Validators.required],
      roleName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      birth: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      registeredAt: ['', Validators.required],
      activationCode: ['', Validators.required],
      activatedAt: ['', Validators.required],
      isDeleted: ['', Validators.required],
      deletedAt: ['', Validators.required],
      jwt: ['', Validators.required],
      institution: ['', Validators.required],
      workgroup: ['', Validators.required]
    })
  }




  getUserInfo(id: number) {
    
    this.userService.getUserInfo(id).subscribe(res => {
      this.userInfo = res;
      console.log(res);
      this.isUserInfoLoading = false;
      this.userInfoForm.controls['id'].setValue(this.userInfo.id);
      this.userInfoForm.controls['roleName'].setValue(this.userInfo.roleName);
      this.userInfoForm.controls['firstName'].setValue(this.userInfo.firstName);
      this.userInfoForm.controls['lastName'].setValue(this.userInfo.lastName);
      this.userInfoForm.controls['phone'].setValue(this.userInfo.phone);
      this.userInfoForm.controls['birth'].setValue(this.userService.getDateFromDateTime(this.userInfo.birth));
      this.userInfoForm.controls['email'].setValue(this.userInfo.email);
      this.userInfoForm.controls['registeredAt'].setValue(this.userService.formatDate(this.userInfo.registeredAt));
      this.userInfoForm.controls['activationCode'].setValue(this.userInfo.activationCode);
      this.userInfoForm.controls['activatedAt'].setValue(this.userService.formatDate(this.userInfo.activatedAt));
      this.userInfoForm.controls['isDeleted'].setValue(this.userInfo.isDeleted);
      this.userInfoForm.controls['deletedAt'].setValue(this.userService.formatDate(this.userInfo.deletedAt));
      this.userInfoForm.controls['jwt'].setValue(this.userInfo.jwt);
      this.selectedUserRole = this.userInfo.roleName;
      this.userInfoForm.disable();
      this.isEditingEnabled = false;
    }, err => {
      console.log(err);
    });

  }




  addUser() {

    this.userService.addUser(this.addUserForm.value).subscribe(res => {
      this.addUserForm.reset();
      console.log(res.status)
      this.isSuccessful = true;
      this.resStatus = res.status;



    }, err => {
      this.resStatus = err.status;
      this.isSuccessful = false;
    });
  }

  resetStatusCode() {
    this.resStatus = 0;
  }


  editUserInfo() {
    this.isEditingEnabled = true;
    this.changeDetection.detectChanges();
    this.userInfoForm.controls['firstName'].enable();
    this.userInfoForm.controls['lastName'].enable();
    this.userInfoForm.controls['birth'].enable();
    this.userInfoForm.controls['email'].enable();
    this.userInfoForm.controls['phone'].enable();
    this.userInfoForm.controls['email'].enable();
    this.userInfoForm.controls['roleName'].enable();
  }

  saveUserInfo() {
    this.userInfoForm.controls['id'].enable();
    this.userInfoForm.value;

    if(this.userInfoForm.value.birth.length > 0 && !this.userInfoForm.value.birth.includes("T00:00:00Z")){
      this.userInfoForm.value.birth = this.userInfoForm.value.birth+"T00:00:00Z";
    };

    this.userService.editUserInfo(this.userInfoForm.value.id,this.userInfoForm.value).subscribe(res => {
      console.log(res);


    }, err => {
      console.log(err);
      this.resStatus = err.status;
      this.isSuccessful = false;
    });

    this.userInfoForm.disable();
    this.isEditingEnabled = false;


  }

  cancelSaveUserInfo() {
    this.userInfoForm.disable();
    this.isEditingEnabled = false;
  }

  cancelAddUser() {
    this.addUserForm.reset();
  }






}
