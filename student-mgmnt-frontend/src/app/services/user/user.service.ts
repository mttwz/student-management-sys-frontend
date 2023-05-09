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
  currentlySelectedUserName!: string;


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

  deleteUser(userId:number){
    return this.http.delete<any>(environment.apiEndpoint + "/user/delete-user/" + userId);
  }


  restoreDeletetUser(userId:number){
    return this.http.post<any>(environment.apiEndpoint + "/user/restore-deleted-user/" + userId, null);
  }

  editUserInfo(id:number,body:any){
    return this.http.post<any>(environment.apiEndpoint + "/user/edit-user-info/"+id,body);
  }

  getDailyAttendance(body:any){
    return this.http.post<any>(environment.apiEndpoint + "/attendance/get-daily-attendance-by-user-id",body);
  }

  createAttendance(body:any){
    return this.http.post<any>(environment.apiEndpoint + "/attendance/create-attendance",body);
  }

  getDailyClasses(body:any){
    return this.http.post<any>(environment.apiEndpoint + "/workgroupschedule/get-user-schedule",body);
  }

  getDailyClassesInWorkgroup(body:any){
    return this.http.post<any>(environment.apiEndpoint + "/workgroupschedule/get-user-schedule-in-workgroup",body);
  }

  searchSuperadmin(groupId:number ,category: string, q: string,pageNumber:number,pageSize:number,sort:string,order:string){
    if(category == 'users-in-workgroup'){
      return this.http.post<any>(environment.apiEndpoint + "/user/search-super-admin?groupId="+groupId+"&category="+category+"&q="+q+"&page="+pageNumber+"&size="+pageSize+"&sort="+sort+","+order,null);
    }
    return this.http.post<any>(environment.apiEndpoint + "/user/search-super-admin?category="+category+"&q="+q+"&page="+pageNumber+"&size="+pageSize+"&sort="+sort+","+order,null);
  }

  searchAdmin(groupId:number ,category: string, q: string,pageNumber:number,pageSize:number,sort:string,order:string){
    if(category == 'users-in-workgroup'){
      return this.http.post<any>(environment.apiEndpoint + "/user/search-admin?groupId="+groupId+"&category="+category+"&q="+q+"&page="+pageNumber+"&size="+pageSize+"&sort="+sort+","+order,null);
    }
    return this.http.post<any>(environment.apiEndpoint + "/user/search-admin?category="+category+"&q="+q+"&page="+pageNumber+"&size="+pageSize+"&sort="+sort+","+order,null);
  }


 
}
