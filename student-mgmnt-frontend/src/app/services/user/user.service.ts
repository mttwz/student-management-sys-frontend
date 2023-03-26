import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  users: any;

  formatDate(fullDate: String) {

    if (fullDate != null) {
      let date = fullDate.split("T")[0];
      let time = fullDate.split("T")[1].split(".")[0];
      return date + " " + time;
    }
    return "";

  }


  getAllUser() {
    return this.http.get<any>("http://127.0.0.1:8080/api/v1/user/get-all-user");
  }

  getUserInfo(body:any){
    return this.http.post<any>("http://127.0.0.1:8080/api/v1/user/get-user-info",body);
  }

  addUser(body:any){
    return this.http.post<any>("http://127.0.0.1:8080/api/v1/user/register-user",body);
  }

  editUserInfo(body:any){
    return this.http.post<any>("http://127.0.0.1:8080/api/v1/user/edit-user-info",body);
  }

  searchSuperadmin(body:any){
    return this.http.post<any>("http://127.0.0.1:8080/api/v1/user/search-super-admin",body);
  }

  getUserFromWorkgroup(body:any){
    return this.http.post<any>("http://127.0.0.1:8080/api/v1/user/get-user-from-workgroup",body);
  }
 
}
