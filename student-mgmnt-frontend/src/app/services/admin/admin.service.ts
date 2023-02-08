import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  getAllAdmin() {
    return this.http.get<any>("http://127.0.0.1:8080/api/v1/user/getalluser");
  }
}
