import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkgroupService {

  constructor(private http: HttpClient) { }

  currentlySelectedWorkgroup!:number;


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


  //Endpointok:

  // Attendance:
  // http://localhost:8080/api/v1/attendance/get-daily-attendance-by-user-id/
  // http://localhost:8080/api/v1/attendance/get-attendance-by-student/2?page=0&size=100&sort=id,desc
  // http://localhost:8080/api/v1/attendance/get-attendance-by-user/2?page=0&size=100&sort=id,desc


  getAllWorkgroup(pageNumber:number,pageSize:number,sort:string,order:string){
    return this.http.get<any>(environment.apiEndpoint + "/workgroup/get-all-workgroups?"+"&page="+pageNumber+"&size="+pageSize+"&sort="+sort+","+order);
  }

  createWorkgroup(body:any){
    return this.http.post<any>(environment.apiEndpoint + "/workgroup/create-workgroup", body);
  }

  deleteWorkgroup(id:number){
    return this.http.delete<any>(environment.apiEndpoint + "/workgroup/delete-workgroup/" + id);
  }

  restoreDeletedWorkgroup(id:number){
    return this.http.post<any>(environment.apiEndpoint + "/workgroup/restore-deleted-workgroup/" + id, null);
  }

  createWorkgroupSchedule(body:any){
    return this.http.post<any>(environment.apiEndpoint + "/workgroupschedule/create-workgroup-schedule", body);
  }

  searchAllWorkgroupMemebers(groupName:string, q: string,pageNumber:number,pageSize:number,sort:string,order:string){
    return this.http.post<any>(environment.apiEndpoint + "/user/search-super-admin?category=users-in-workgroup"+"&q="+q+"&page="+pageNumber+"&size="+pageSize+"&sort="+sort+","+order,groupName);
  }

  addUserToWorkgroup(body:any){
    // http://localhost:8080/api/v1/workgroup/add-user-to-workgroup
    return this.http.post<any>(environment.apiEndpoint + "/workgroup/add-user-to-workgroup", body);
  }

  getUserSchedule(pageNumber:number, pageSize:number, sort:string, order:string){
      // http://localhost:8080/api/v1/workgroupschedule/get-user-schedule/?page=0&size=2&sort=start,asc
      return this.http.get<any>(environment.apiEndpoint + "/workgroupschedule/get-user-schedule/?page=" + pageNumber + "&size=" + pageSize + "&sort=" + sort + "," + order);
  }

  getWorkgroupScheduleByUserId(userId:number, pageNumber:number, pageSize:number,){
      // http://localhost:8080/api/v1/workgroupschedule/get-workgroup-schedule-by-user-id/2?page=0&size=1
      return this.http.get<any>(environment.apiEndpoint + "/workgroupschedule/get-workgroup-schedule-by-user-id/" + userId + "?page=" + pageNumber + "&size=" + pageSize);
  }

  getWorkgroupScheduleByWorkgroupId(workgroupId:number){
      // http://localhost:8080/api/v1/workgroupschedule/get-workgroup-schedule-by-workgroup-id/1
      return this.http.get<any>(environment.apiEndpoint + "/workgroupschedule/get-workgroup-schedule-by-workgroup-id/" + workgroupId);
  }

  getWorkgroupInfo(workgroupId: number){
    //http://localhost:8080/api/v1/workgroup/get-workgroup-info/1
    return this.http.get<any>(environment.apiEndpoint + "/workgroup/get-workgroup-info/" + workgroupId);
  }

  editWorkgroupInfo(workgroupId:number,body:any){
    //http://localhost:8080/api/v1/workgroup/edit-workgroup-info/1
    return this.http.post<any>(environment.apiEndpoint + "/workgroup/edit-workgroup-info/" + workgroupId, body);
  }

}
