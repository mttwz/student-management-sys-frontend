import { EventEmitter, Injectable } from '@angular/core';
import { UserService } from '../../user/user.service';
import { WorkgroupService } from '../../workgroup/workgroup.service';

@Injectable({
  providedIn: 'root'
})
export class AdminModalService {

  currentlySelectedModal!:String;

  modalSearchtext:string = "";
  modalPageNumber:number = 0;
  modalPageSize:number = 10;
  modalSort:string = "id";
  modalOrder:string = "asc";
  modalAllPages!:number;

  allUsersModal!:any;

  isModalUsersLoading = true;

  isSuccessfull!: boolean | undefined;

  private timeoutId!: any;

  constructor(
    private userService:UserService,
    private workgroupService:WorkgroupService
  ) { }

  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();


  changeModal(modalName:string){
    this.currentlySelectedModal = modalName;
    this.changeDetectionEmitter.emit();
  }


  adminSearchOnlyUsersInModals(){
    
    this.userService.searchAdmin(this.workgroupService.currentlySelectedWorkgroupId, "student", this.modalSearchtext, this.modalPageNumber, this.modalPageSize, this.modalSort, this.modalOrder).subscribe(res => {
      this.allUsersModal = res.userInfoDtoList;
      this.isModalUsersLoading = false;
      this.modalAllPages = res.allPages;
      this.changeDetectionEmitter.emit();
    }, err => {

    })
  }

  adminSearchOnlyUsersInModalsWithDebounce(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.adminSearchOnlyUsersInModals();
    }, 250); 
  }

  adminSearchOnlyUsersInWorkgroupInModals(){
    
    this.userService.searchAdmin(this.workgroupService.currentlySelectedWorkgroupId, "users-in-workgroup", this.modalSearchtext, this.modalPageNumber, this.modalPageSize, this.modalSort, this.modalOrder).subscribe(res => {
      this.allUsersModal = res.userInfoDtoList;
      this.isModalUsersLoading = false;
      this.modalAllPages = res.allPages;
      this.changeDetectionEmitter.emit();
    }, err => {

    })

  }

  adminSearchOnlyUsersInWorkgroupInModalsWithDebounce(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.adminSearchOnlyUsersInWorkgroupInModals();
    }, 250); 
  }

  adminSearchAddableUsersInModals(){
    
    this.workgroupService.searchAddableUsers(this.workgroupService.currentlySelectedWorkgroupId,this.modalSearchtext,this.modalPageNumber,this.modalPageSize).subscribe(res => {
      this.allUsersModal = res.userInfoDtoList;
      this.isModalUsersLoading = false;
      this.modalAllPages = res.allPages;
      this.changeDetectionEmitter.emit();
    }, err => {

    })

  }


  adminSearchAddableUsersWithDebounce(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.adminSearchAddableUsersInModals();
    }, 250); 
  }

  adPageClick(num: number) {
    this.modalPageNumber = num;
    this.adminSearchOnlyUsersInModals();
    this.changeDetectionEmitter.emit();
  }


  createRange() {
    if(this.modalAllPages == 0){
      return [1];
    }
    return new Array(this.modalAllPages).fill(0)
      .map((n, index) => index + 1);
  }

}
