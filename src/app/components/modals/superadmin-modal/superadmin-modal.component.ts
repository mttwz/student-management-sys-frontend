import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { WorkgroupService } from 'src/app/services/workgroup/workgroup.service';
import { formatDate } from '@angular/common';
import { DateFormatterService } from 'src/app/services/utils/date-formatter.service';
import { SuperadminTableService } from 'src/app/services/table/superadmin/superadmin-table.service';
import { SuperadminModalService } from 'src/app/services/modal/superadmin/superadmin-modal.service';
import { CardService } from 'src/app/services/card/card.service';
import { ErrorCodes } from 'src/app/enum/error-codes';
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

  // public workgroupMembersForm !: FormGroup;
  public createWorkgroupForm !: FormGroup;
  public createWorkgroupScheduleForm !: FormGroup;
  public workgroupInfoForm !: FormGroup;


  public getWorkgroupScheduleByUserIdForm !: FormGroup;




  errorCode!: any;



  userInfo!: any;
  isUserInfoLoading: Boolean = true;
  selectedUserId!: Number;
  selectedUserRole!: String;
  isEditingEnabled: Boolean = false;
  allWorkgroups !: Array<any>;
  allAvaliableCard !: Array<any>;
  studentDailyAttendance !: Array<any>;
  studentDailyClasses !: Array<any>;

  allDailyWorkgroupClasses !: Array<any>;
  isWorkgroupClassesLoading: Boolean = true;

  workgroupInfo!: any;
  isWorkgroupInfoLoading: Boolean = true;

  isdailyAttendanceLoading: Boolean = true;
  isdailyClassesLoading: Boolean = true;

  allWorkgroupScheduleByUserId !: any;

  selectedCardId!: number;

  pageNumber: number = 0;

  id!: number;


  selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  arrivalInput: any;
  leavingInput: any;



  constructor(
    private formBuilder: FormBuilder,
    public superadminTableService: SuperadminTableService,
    public userService: UserService,
    public workgroupService: WorkgroupService,
    private changeDetection: ChangeDetectorRef,
    public dateUtil: DateFormatterService,
    public superadminModalService: SuperadminModalService,
    private cardService: CardService) { }

  ngOnInit(): void {

    this.addUserForm = this.formBuilder.group({
      roleName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      birth: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
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


    this.getWorkgroupScheduleByUserIdForm = this.formBuilder.group({
      name: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      isOnsite: ['', Validators.required],

    })


    this.workgroupInfoForm = this.formBuilder.group({
      id: ['', Validators.required],
      groupName: ['', Validators.required],
      institution: ['', Validators.required],
      createdAt: ['', Validators.required],
      isDeleted: ['', Validators.required],
      deletedAt: ['', Validators.required],
    })

  }



  //Get user infor with userid
  getUserInfo(id: number) {
    this.userService.getUserInfo(id).subscribe(res => {
      this.userInfo = res;
      this.isUserInfoLoading = false;
      this.userInfoForm.controls['id'].setValue(this.userInfo.id);
      this.userInfoForm.controls['roleName'].setValue(this.userInfo.roleName);
      this.userInfoForm.controls['firstName'].setValue(this.userInfo.firstName);
      this.userInfoForm.controls['lastName'].setValue(this.userInfo.lastName);
      this.userInfoForm.controls['phone'].setValue(this.userInfo.phone);
      this.userInfoForm.controls['birth'].setValue(this.dateUtil.getDateFromDateTime(this.userInfo.birth));
      this.userInfoForm.controls['email'].setValue(this.userInfo.email);
      this.userInfoForm.controls['registeredAt'].setValue(this.dateUtil.dateFormatter(this.userInfo.registeredAt));
      this.userInfoForm.controls['activationCode'].setValue(this.userInfo.activationCode);
      this.userInfoForm.controls['activatedAt'].setValue(this.dateUtil.dateFormatter(this.userInfo.activatedAt));
      this.userInfoForm.controls['isDeleted'].setValue(this.userInfo.isDeleted);
      this.userInfoForm.controls['deletedAt'].setValue(this.dateUtil.dateFormatter(this.userInfo.deletedAt));
      this.userInfoForm.controls['jwt'].setValue(this.userInfo.jwt);
      this.selectedUserRole = this.userInfo.roleName;
      this.userInfoForm.disable();
      this.isEditingEnabled = false;
      this.changeDetection.detectChanges();
    }, err => {

    });
  }


  //Add user manual
  addUser() {
    if (this.addUserForm.value.birth.length > 0 && !this.addUserForm.value.birth.includes("T00:00:00Z")) {
      this.addUserForm.value.birth = this.addUserForm.value.birth + "T00:00:00Z";
    };

    this.userService.addUser(this.addUserForm.value).subscribe(res => {
      this.addUserForm.reset();
      this.superadminModalService.isSuccessfull = true;

    }, err => {
      let str: keyof typeof ErrorCodes = err.error.apiError;
      this.errorCode = ErrorCodes[str];
      this.superadminModalService.isSuccessfull = false;

    });
  }

  //Logical, non-permanent deletion of the user by userid
  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(res => {

    }, err => {


    });
  }

  //Restore deleted user by userid
  restoreDeletedUser(userId: number) {
    this.userService.restoreDeletetUser(userId).subscribe(res => {

    }, err => {

    });
  }

  //Logical, non-permanent deletion of workgroup by workgroupid
  deleteWorkgroup(workgroupId: number) {
    this.workgroupService.deleteWorkgroup(workgroupId).subscribe(res => {

    }, err => {


    });
  }

  //Restore deleted workgroup
  restoreDeletedWorkgroup(workgroupId: number) {
    this.workgroupService.restoreDeletedWorkgroup(workgroupId).subscribe(res => {

    }, err => {

    });
  }


  //Add user to workgroup by userid.
  addUserToWorkgroup(userId: number) {
    let body = {
      userId: userId,
      workgroupId: this.workgroupService.currentlySelectedWorkgroupId
    };
    this.workgroupService.addUserToWorkgroup(body).subscribe(res => {
      this.superadminModalService.isSuccessfull = true;
      this.superadminModalService.superadminSearchAddableUsersInModals();
    }, err => {
      this.superadminModalService.isSuccessfull = false;
      let str: keyof typeof ErrorCodes = err.error.apiError;
      this.errorCode = ErrorCodes[str];
    });
  }

  //Remove user from workgroup by userid
  removeUserFromWorkgroup(userId: number) {

    let body = {
      userId: userId,
      workgroupId: this.workgroupService.currentlySelectedWorkgroupId
    };
    this.workgroupService.removeUserFromWorkgroup(body).subscribe(res => {
      this.superadminModalService.isSuccessfull = true;
      this.superadminModalService.superadminSearchOnlyUsersInWorkgroupInModals();

    }, err => {
      this.superadminModalService.isSuccessfull = false;
      let str: keyof typeof ErrorCodes = err.error.apiError;
      this.errorCode = ErrorCodes[str];

    });
  }




  //Create workgroup manual
  createWorkgroup() {

    this.workgroupService.createWorkgroup(this.createWorkgroupForm.value).subscribe(res => {
      this.createWorkgroupForm.reset();
      this.superadminModalService.isSuccessfull = true;
    }, err => {
      this.superadminModalService.isSuccessfull = false;
    });
  }


  //Create workgroup schedule
  createWorkgroupSchedule() {
    if (!this.createWorkgroupScheduleForm.value.end.includes(":00Z") && !this.createWorkgroupScheduleForm.value.start.includes(":00Z")) {
      this.createWorkgroupScheduleForm.value.start = this.createWorkgroupScheduleForm.value.start + ":00Z";
      this.createWorkgroupScheduleForm.value.end = this.createWorkgroupScheduleForm.value.end + ":00Z";
    };

    this.createWorkgroupScheduleForm.value.workgroupId = this.workgroupService.currentlySelectedWorkgroupId;

    this.workgroupService.createWorkgroupSchedule(this.createWorkgroupScheduleForm.value).subscribe(res => {
      this.createWorkgroupScheduleForm.reset();
      this.superadminModalService.isSuccessfull = true;
    }, err => {
      this.superadminModalService.isSuccessfull = false;
      let str: keyof typeof ErrorCodes = err.error.apiError;
      this.errorCode = ErrorCodes[str];
    });

  }



  //Edit user info
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


  //Save edited user info
  saveUserInfo() {
    this.userInfoForm.controls['id'].enable();
    this.userInfoForm.value;

    if (this.userInfoForm.value.birth.length > 0 && !this.userInfoForm.value.birth.includes("T00:00:00Z")) {
      this.userInfoForm.value.birth = this.userInfoForm.value.birth + "T00:00:00Z";
    };
    this.userService.editUserInfo(this.userInfoForm.value.id, this.userInfoForm.value).subscribe(res => {

      this.superadminModalService.isSuccessfull = true;

    }, err => {

      this.superadminModalService.isSuccessfull = false;
      let str: keyof typeof ErrorCodes = err.error.apiError;
      this.errorCode = ErrorCodes[str];

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
    this.workgroupInfoForm.disable();
    this.changeDetection.detectChanges();
  }


  //Workgroup
  cancelCreateWorkgroup() {
    this.createWorkgroupForm.reset();

  }

  cancelCreateWorkgroupSchedule() {
    this.createWorkgroupForm.reset();

  }

  //Get workgroup info by workgroupid
  getWorkgroupInfo(id: number) {

    this.workgroupService.getWorkgroupInfo(id).subscribe(res => {
      this.workgroupInfo = res;
      this.isWorkgroupInfoLoading = false;

      this.workgroupInfoForm.controls['id'].setValue(this.workgroupInfo.id);
      this.workgroupInfoForm.controls['groupName'].setValue(this.workgroupInfo.groupName);
      this.workgroupInfoForm.controls['institution'].setValue(this.workgroupInfo.institution);

      this.workgroupInfoForm.controls['createdAt'].setValue(this.dateUtil.dateFormatter(this.workgroupInfo.createdAt));
      this.workgroupInfoForm.controls['isDeleted'].setValue(this.workgroupInfo.isDeleted);
      this.workgroupInfoForm.controls['deletedAt'].setValue(this.dateUtil.dateFormatter(this.workgroupInfo.deletedAt));

      this.workgroupInfoForm.disable();
      this.isEditingEnabled = false;
      this.changeDetection.detectChanges();


    }, err => {

    });
  }


  //Edit workgroup name and/or institution.
  editWorkgroupInfo() {
    this.isEditingEnabled = true;
    this.changeDetection.detectChanges();
    this.workgroupInfoForm.controls['groupName'].enable();
    this.workgroupInfoForm.controls['institution'].enable();
  }

  //Save edited workgroupinfo
  saveWorkgroupInfo() {
    this.workgroupInfoForm.controls['id'].enable();
    this.workgroupInfoForm.value;

    this.workgroupService.editWorkgroupInfo(this.workgroupInfoForm.value.id, this.workgroupInfoForm.value).subscribe(res => {

      this.superadminModalService.isSuccessfull = true;
    }, err => {

      this.superadminModalService.isSuccessfull = false;
    });

    this.workgroupInfoForm.disable();
    this.isEditingEnabled = false;
    this.changeDetection.detectChanges();
  }


  //Get student daily attendance by userid
  getStudentDailyAttendance(userId: number) {


    let body = {
      userId: userId,
      date: this.dateUtil.dateFormatterForBackend(this.selectedDate)
    };

    this.userService.getDailyAttendance(body).subscribe(res => {
      this.studentDailyAttendance = res;
      this.isdailyAttendanceLoading = false;
      this.changeDetection.detectChanges();
    })


  }


  //Add student daily attendance by userid
  addStudentDailyAttendance(userId: number) {

    if (this.arrivalInput != undefined && this.arrivalInput != undefined) {
      let body = {
        userId: userId,
        arrival: this.dateUtil.dateTimeFormatterForBackend(this.arrivalInput),
        leaving: this.dateUtil.dateTimeFormatterForBackend(this.leavingInput)
      };

      this.userService.createAttendance(body).subscribe(res => {
        this.studentDailyAttendance = res;
        this.isdailyAttendanceLoading = false;
        this.changeDetection.detectChanges();
        this.getStudentDailyAttendance(this.userService.currentlySelectedUserId);
        this.superadminModalService.isSuccessfull = true;

      },err =>{
        this.superadminModalService.isSuccessfull = false;
        let str: keyof typeof ErrorCodes = err.error.apiError;
        this.errorCode = ErrorCodes[str];

        
      })
    }



  }






  //Get student daily classes by userid
  getStudentDailyClasses(userId: number) {

    let body = {
      userId: userId,
      date: this.dateUtil.dateFormatterForBackend(this.selectedDate)
    };

    this.workgroupService.getUserSchedule(body).subscribe(res => {

      this.studentDailyClasses = res;
      this.isdailyClassesLoading = false;
      this.changeDetection.detectChanges();
    })
  }



  getStudentDailyClassesPerWg(userId: number) {

    let body = {
      userId: userId,
      workgroupId: this.workgroupService.currentlySelectedWorkgroupId,
      date: this.dateUtil.dateFormatterForBackend(this.selectedDate)
    };


    this.userService.getDailyClassesInWorkgroup(body).subscribe(res => {

      this.studentDailyClasses = res;
      this.isdailyClassesLoading = false;
      this.changeDetection.detectChanges();
    })

  }


  getDailyWorkgroupSchedule() {

    let body = {
      workgroupId: this.workgroupService.currentlySelectedWorkgroupId,
      start: this.dateUtil.dateFormatterForBackend(this.selectedDate)
    };

    this.workgroupService.getDailyWorkgroupScheduleByWorkgroupId(body).subscribe(res => {
      this.allDailyWorkgroupClasses = res.workgroupscheduleDtoList;
      this.isWorkgroupClassesLoading = false;
      this.changeDetection.detectChanges();
    }, err => {

    })

  }

  getAllAvaliableCard() {

    this.cardService.getAllAvaliableCard().subscribe(res => {
      this.allAvaliableCard = res
      this.changeDetection.detectChanges();
    }, err => {

    })

  }

  assignCardToStudent() {

    let body = {
      userId: this.userService.currentlySelectedUserId,
      cardId: parseInt(this.selectedCardId.toString().split("--")[0])
    };
    this.cardService.assignCardToStudent(body).subscribe(res => {
      this.superadminModalService.isSuccessfull = true;
      this.allAvaliableCard = res
      this.getAllAvaliableCard();
      this.changeDetection.detectChanges();
    }, err => {
      this.superadminModalService.isSuccessfull = false;
      let str: keyof typeof ErrorCodes = err.error.apiError;
      this.errorCode = ErrorCodes[str];
    })

  }



}
