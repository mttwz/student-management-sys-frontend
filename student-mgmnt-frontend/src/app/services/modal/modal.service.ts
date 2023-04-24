import { ChangeDetectorRef, EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  currentlySelectedModal!:String;

  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();
  
  changeModal(modalName:string){
    this.currentlySelectedModal = modalName;
    this.changeDetectionEmitter.emit();

   
  }
}
