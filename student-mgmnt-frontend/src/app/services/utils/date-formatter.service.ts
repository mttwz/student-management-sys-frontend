import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {

  constructor() { }


  dateFormatter(date:string){
    if(date == null){
      return "";
    }
    return date.split("T")[0] +" "+ date.split("T")[1].split("+")[0];
  }
}
