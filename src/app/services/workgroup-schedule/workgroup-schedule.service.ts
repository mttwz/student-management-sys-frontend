import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkgroupScheduleService {

  constructor(private http: HttpClient) { }


  getDailyAttendance(body:any){
    return this.http.get<any>(environment.apiEndpoint + "/workgroupschedule/get-workgroup-schedule-by-user-id/",body);
  }
}
