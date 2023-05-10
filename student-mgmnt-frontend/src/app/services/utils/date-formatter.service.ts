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

  dateTimeFormatterForBackend(date:string){
    return date+"Z";
  }

  dateFormatterForBackend(date:string){
    return date+"T00:00:00Z";
  }

  getDateFromDateTime(fullDate: String) {

    if (fullDate != null) {
      let date = fullDate.split("T")[0];
      
      return date;
    }
    return "";

  }
}
