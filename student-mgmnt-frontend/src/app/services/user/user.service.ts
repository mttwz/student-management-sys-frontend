import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  users: any;
  currentlySelectedUserId!: number;

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


  getAllUser() {
    return this.http.get<any>(environment.apiEndpoint + "/user/get-all-user");
  }

  getUserInfo(userId:number){
    return this.http.get<any>(environment.apiEndpoint + "/user/get-user-info/"+userId);
  }

  addUser(body:any){
    return this.http.post<any>(environment.apiEndpoint + "/user/register-user",body);
  }

  editUserInfo(id:number,body:any){
    return this.http.post<any>(environment.apiEndpoint + "/user/edit-user-info/"+id,body);
  }

  getDailyAttendance(body:any){
    return this.http.post<any>(environment.apiEndpoint + "/attendance/get-daily-attendance-by-user-id",body);
  }

  getDailyClasses(body:any){
    return this.http.post<any>(environment.apiEndpoint + "/workgroupschedule/get-user-schedule",body);
  }

  searchSuperadmin(groupName:string ,category: string, q: string,pageNumber:number,pageSize:number,sort:string,order:string){
    return this.http.post<any>(environment.apiEndpoint + "/user/search-super-admin?category="+category+"&q="+q+"&page="+pageNumber+"&size="+pageSize+"&sort="+sort+","+order,groupName);
  }


 
}
