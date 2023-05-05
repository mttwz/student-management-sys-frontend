import { ChangeDetectorRef, EventEmitter, Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { WorkgroupService } from '../workgroup/workgroup.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor( public userService: UserService, public workgroupService: WorkgroupService,  ) { }

  currentlySelectedModal!:String;

  modalSearchtext:string = "";
  modalPageNumber:number = 0;
  modalPageSize:number = 99;
  modalSort:string = "id";
  modalOrder:string = "asc";
  modalAllPages!:number;

  allUsersModal!:any;

  isModalUsersLoading = true;

  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();
  
  private timeoutId!: any;

  changeModal(modalName:string){
    this.currentlySelectedModal = modalName;
    this.changeDetectionEmitter.emit();
  }

  searchOnlyUsersInModalsWithDebounce(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      console.error("miafasz")
      this.searchOnlyUsersInModals();
    }, 250); 
  }

  searchOnlyUsersInModals(){
    
    this.userService.searchSuperadmin(this.workgroupService.currentlySelectedWorkgroupId, "users", this.modalSearchtext, this.modalPageNumber, this.modalPageSize, this.modalSort, this.modalOrder).subscribe(res => {
      this.allUsersModal = res.userInfoDtoList;
      this.isModalUsersLoading = false;
      this.modalAllPages = res.allPages;
      this.changeDetectionEmitter.emit();
    }, err => {
      console.log(err)
    })

   
  }

  searchOnlyUsersInWorkgroupInModals(){
    
    this.userService.searchSuperadmin(this.workgroupService.currentlySelectedWorkgroupId, "users-in-workgroup", this.modalSearchtext, this.modalPageNumber, this.modalPageSize, this.modalSort, this.modalOrder).subscribe(res => {
      this.allUsersModal = res.userInfoDtoList;
      this.isModalUsersLoading = false;
      this.modalAllPages = res.allPages;
      this.changeDetectionEmitter.emit();
    }, err => {
      console.log(err)
    })

   
  }

  pageClick(num: number) {
    this.modalPageNumber = num;
    this.searchOnlyUsersInModals();
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
