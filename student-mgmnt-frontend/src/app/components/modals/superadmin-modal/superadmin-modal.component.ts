import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableService } from 'src/app/services/table/table.service';
import { UserService } from 'src/app/services/user/user.service';
import { SuperadminDashboardComponent } from '../../dashboards/superadmin-dashboard/superadmin-dashboard.component';
import { WorkgroupService } from 'src/app/services/workgroup/workgroup.service';
declare var $: any;


@Component({
  selector: 'app-superadmin-modal',
  templateUrl: './superadmin-modal.component.html',
  styleUrls: ['./superadmin-modal.component.css']
})
export class SuperadminModalComponent implements OnInit {

  @Input() modalId!: String;
  
  public addUserForm !: FormGroup;
  public userInfoForm !: FormGroup;

  public workgroupMembersForm !: FormGroup;
  public createWorkgroupForm !: FormGroup;
  public createWorkgroupScheduleForm !: FormGroup;
  public addUserToWorkgroupForm !: FormGroup;

  public getWorkgroupScheduleByUserIdForm !: FormGroup;

  public isSuccessful: any;
  public resStatus!: Number;
  userInfo!: any
  isUserInfoLoading: Boolean = true;
  selectedUserId!: Number;
  selectedUserRole!: String;
  isEditingEnabled: Boolean = false;
  allWorkgroups !: Array<any>;

  allWorkgroupScheduleByUserId !: any;


  pageSize: number = 90; // <- erre kikell talalni valamit
  pageNumber: number = 0;



  constructor(
    private formBuilder: FormBuilder,
    public tableService: TableService,
    private userService: UserService,
    public workgroupService: WorkgroupService,
    private changeDetection: ChangeDetectorRef,
    public superadminDashboard: SuperadminDashboardComponent) { }

  ngOnInit(): void {



    $(document).on('hidden.bs.modal', '#mainModal', () => {

      // this.isEditingEnabled = false;
      // this.isSuccessful = false;
      // this.changeDetection.detectChanges();
      // console.error("itttt<??????")
    })







    this.addUserForm = this.formBuilder.group({
      roleName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      birth: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      // role: ['', Validators.required]
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

    this.createWorkgroupForm = this.formBuilder.group({
      groupName: ['', Validators.required],
      institution: ['', Validators.required],
      isDeleted: ['', Validators.required]

    })

    this.createWorkgroupScheduleForm = this.formBuilder.group({
      name: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      isOnsite: ['', Validators.required],
      workgroupId: ['', Validators.required]
    })

    this.addUserToWorkgroupForm = this.formBuilder.group({
      userId: ['', Validators.required],
      workgroupId: ['', Validators.required]
    })

    this.getWorkgroupScheduleByUserIdForm = this.formBuilder.group({
      name: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      isOnsite: ['', Validators.required],

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
      this.changeDetection.detectChanges();


    }, err => {
      console.log(err);
    });



  }

  addUser() {
    if (this.addUserForm.value.birth.length > 0 && !this.addUserForm.value.birth.includes("T00:00:00Z")) {
      this.addUserForm.value.birth = this.addUserForm.value.birth + "T00:00:00Z";
    };

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


  //Workgroup 


  // getWorkgroupScheduleByUserId(id: number) {
  //   this.workgroupService.getWorkgroupScheduleByUserId(id, this.pageNumber, this.pageSize).subscribe(res => {
  //     this.allWorkgroupScheduleByUserId = res.workgroupscheduleDtoList;
  //     this.isUserInfoLoading = false;

  //     console.log(this.allWorkgroupScheduleByUserId.name);
  //     this.getWorkgroupScheduleByUserIdForm.controls['name'].setValue(this.allWorkgroupScheduleByUserId.name);
  //     this.getWorkgroupScheduleByUserIdForm.controls['start'].setValue(this.workgroupService.getDateFromDateTime(this.allWorkgroupScheduleByUserId.start));
  //     this.getWorkgroupScheduleByUserIdForm.controls['end'].setValue(this.workgroupService.getDateFromDateTime(this.allWorkgroupScheduleByUserId.end));
  //     this.getWorkgroupScheduleByUserIdForm.controls['isOnsite'].setValue(this.allWorkgroupScheduleByUserId.isOnsite);

  //     this.getWorkgroupScheduleByUserIdForm.disable();
  //     this.changeDetection.detectChanges();

  //   }, err => {
  //     console.log(err);
  //   });
  // }

  addUserToWorkgroup() {
    this.workgroupService.addUserToWorkgroup(this.addUserToWorkgroupForm.value).subscribe(res => {
      this.addUserToWorkgroupForm.reset();
      this.isSuccessful = true;
      this.resStatus = res.status;
    }, err => {
      this.resStatus = err.status;
      this.isSuccessful = false;
    });
  }

  createWorkgroup() {
    this.workgroupService.createWorkgroup(this.createWorkgroupForm.value).subscribe(res => {
      this.createWorkgroupForm.reset();
      this.isSuccessful = true;
      this.resStatus = res.status;
    }, err => {
      this.resStatus = err.status;
      this.isSuccessful = false;
    });
  }

  createWorkgroupSchedule() {
    if (!this.createWorkgroupScheduleForm.value.end.includes(":00Z") && !this.createWorkgroupScheduleForm.value.start.includes(":00Z")) {
      this.createWorkgroupScheduleForm.value.start = this.createWorkgroupScheduleForm.value.start + ":00Z";
      this.createWorkgroupScheduleForm.value.end = this.createWorkgroupScheduleForm.value.end + ":00Z";
    };


    this.workgroupService.createWorkgroupSchedule(this.createWorkgroupScheduleForm.value).subscribe(res => {
      this.createWorkgroupScheduleForm.reset();
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

    if (this.userInfoForm.value.birth.length > 0 && !this.userInfoForm.value.birth.includes("T00:00:00Z")) {
      this.userInfoForm.value.birth = this.userInfoForm.value.birth + "T00:00:00Z";
    };

    this.userService.editUserInfo(this.userInfoForm.value.id, this.userInfoForm.value).subscribe(res => {
      console.log(res);
      this.isSuccessful = true;

    }, err => {
      console.log(err);
      this.resStatus = err.status;
      this.isSuccessful = false;
    });

    this.userInfoForm.disable();
    this.isEditingEnabled = false;
    this.changeDetection.detectChanges();
  }

  cancelSaveUserInfo() {
    this.userInfoForm.disable();
    this.isEditingEnabled = false;

  }

  cancelAddUser() {
    this.addUserForm.reset();

  }

  cancelEdit() {
    this.isEditingEnabled = false;
    this.userInfoForm.disable();
    this.changeDetection.detectChanges();
  }


  //Workgroup
  cancelCreateWorkgroup() {
    this.createWorkgroupForm.reset();

  }

  cancelCreateWorkgroupSchedule() {
    this.createWorkgroupForm.reset();

  }






}
