import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkgroupService {

  constructor(private http: HttpClient) { }


  formatDate(fullDate: String) {

    if (fullDate != null) {
      let date = fullDate.split("T")[0];
      let time = fullDate.split("T")[1].split(".")[0];
      return date + " " + time;
    }
    return "";

  }

  getDateFromDateTime(fullDate: String) {

    if (fullDate != null) {
      let date = fullDate.split("T")[0];
      
      return date;
    }
    return "";

  }


  getAllWorkgroup(pageNumber:number,pageSize:number,sort:string,order:string){
    return this.http.get<any>(environment.apiEndpoint + "/workgroup/get-all-workgroups?"+"&page="+pageNumber+"&size="+pageSize+"&sort="+sort+","+order);
  }

  createWorkgroup(body:any){
    return this.http.post<any>(environment.apiEndpoint + "/workgroup/create-workgroup", body);
  }

  createWorkgroupSchedule(body:any){
    return this.http.post<any>(environment.apiEndpoint + "/workgroupschedule/create-workgroup-schedule", body);
  }

  searchAllWorkgroupMemebers(groupName:string, q: string,pageNumber:number,pageSize:number,sort:string,order:string){
    return this.http.post<any>(environment.apiEndpoint + "/user/search-super-admin?category=users-in-workgroup"+"&q="+q+"&page="+pageNumber+"&size="+pageSize+"&sort="+sort+","+order,groupName);
  }

}
