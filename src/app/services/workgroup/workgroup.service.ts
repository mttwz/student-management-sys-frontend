import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkgroupService {

  constructor(private http: HttpClient) { }

  currentlySelectedWorkgroupId!: number;
  currentlySelectedWorkgroupName!: string;


  getAllWorkgroup(pageNumber: number, pageSize: number, sort: string, order: string) {
    return this.http.get<any>(environment.apiEndpoint + "/workgroup/get-all-workgroups?" + "&page=" + pageNumber + "&size=" + pageSize + "&sort=" + sort + "," + order);
  }

  createWorkgroup(body: any) {
    return this.http.post<any>(environment.apiEndpoint + "/workgroup/create-workgroup", body);
  }

  deleteWorkgroup(id: number) {
    return this.http.delete<any>(environment.apiEndpoint + "/workgroup/delete-workgroup/" + id);
  }

  restoreDeletedWorkgroup(id: number) {
    return this.http.post<any>(environment.apiEndpoint + "/workgroup/restore-deleted-workgroup/" + id, null);
  }

  createWorkgroupSchedule(body: any) {
    return this.http.post<any>(environment.apiEndpoint + "/workgroupschedule/create-workgroup-schedule", body);
  }

  searchAllWorkgroupMemebers(groupName: string, q: string, pageNumber: number, pageSize: number, sort: string, order: string) {
    return this.http.post<any>(environment.apiEndpoint + "/user/search-super-admin?category=users-in-workgroup" + "&q=" + q + "&page=" + pageNumber + "&size=" + pageSize + "&sort=" + sort + "," + order, groupName);
  }

  addUserToWorkgroup(body: any) {
    return this.http.post<any>(environment.apiEndpoint + "/workgroup/add-user-to-workgroup", body);
  }

  removeUserFromWorkgroup(body: any) {
    return this.http.post<any>(environment.apiEndpoint + "/workgroup/remove-user-from-workgroup", body);
  }

  getUserSchedule(body: any) {
    return this.http.post<any>(environment.apiEndpoint + "/workgroupschedule/get-user-schedule", body);
  }

  getUserScheduleWithPaging(body: any, pageNumber: number, pageSize: number, sort: string, order: string) {
    return this.http.post<any>(environment.apiEndpoint + "/workgroupschedule/get-user-schedule/?page=" + pageNumber + "&size=" + pageSize + "&sort=" + sort + "," + order, body);
  }

  getOwnUserSchedule(body: any) {
    return this.http.post<any>(environment.apiEndpoint + "/workgroupschedule/get-own-user-schedule", body);
  }

  getOwnUserScheduleWithPaging(body: any, pageNumber: number, pageSize: number, sort: string, order: string) {
    return this.http.post<any>(environment.apiEndpoint + "/workgroupschedule/get-own-user-schedule/?page=" + pageNumber + "&size=" + pageSize + "&sort=" + sort + "," + order, body);
  }

  getWorkgroupScheduleByUserId(userId: number, pageNumber: number, pageSize: number) {
    return this.http.get<any>(environment.apiEndpoint + "/workgroupschedule/get-workgroup-schedule-by-user-id/" + userId + "?page=" + pageNumber + "&size=" + pageSize);
  }

  getDailyWorkgroupScheduleByWorkgroupId(body: any) {
    return this.http.post<any>(environment.apiEndpoint + "/workgroupschedule/get-daily-workgroup-schedule-by-workgroup-id", body);
  }

  getWorkgroupInfo(workgroupId: number) {
    return this.http.get<any>(environment.apiEndpoint + "/workgroup/get-workgroup-info/" + workgroupId);
  }

  editWorkgroupInfo(workgroupId: number, body: any) {
    return this.http.post<any>(environment.apiEndpoint + "/workgroup/edit-workgroup-info/" + workgroupId, body);
  }

  searchAddableUsers(workgroupId: number, q: string,pageNumber: number, pageSize: number) {
    return this.http.get<any>(environment.apiEndpoint + "/workgroup/search-addable-users/" + workgroupId + "?q=" + q + "&page=" + pageNumber + "&size=" + pageSize);
  }

}
