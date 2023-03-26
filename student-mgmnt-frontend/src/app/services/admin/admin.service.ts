import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  getAllAdmin() {
    return this.http.get<any>(environment.apiEndpoint + "/user/getalluser");
  }
}
