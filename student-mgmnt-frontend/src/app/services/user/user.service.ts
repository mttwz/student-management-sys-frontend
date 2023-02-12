import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  users: any;


  getAllUser() {
    return this.http.get<any>("http://127.0.0.1:8080/api/v1/user/getalluser");
  }

  getUserInfo(body:any){
    return this.http.post<any>("http://127.0.0.1:8080/api/v1/user/getuserinfo",body);
  }

  addUser(body:any){
    return this.http.post<any>("http://127.0.0.1:8080/api/v1/user/registeruser",body);
  }
}
