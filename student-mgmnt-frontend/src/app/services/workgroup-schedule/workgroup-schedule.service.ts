import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkgroupScheduleService {

  constructor(private http: HttpClient) { }


  getDailyAttendance(body:any){
    // http://localhost:8080/api/v1/workgroupschedule/get-workgroup-schedule-by-user-id/2?page=0&size=1
    return this.http.get<any>(environment.apiEndpoint + "/workgroupschedule/get-workgroup-schedule-by-user-id/",body);
  }
}
