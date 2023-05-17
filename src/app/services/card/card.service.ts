import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }



  getAllAvaliableCard(){
    return this.http.get<any>(environment.apiEndpoint + "/card/get-all-avaliable-card");
  }

  assignCardToStudent(body:any){
    return this.http.post<any>(environment.apiEndpoint + "/card/assign-card-to-student",body);
  }

  unassignCardFromStudent(userId:number){
    return this.http.post<any>(environment.apiEndpoint + "/card/unassign-card-from-student/" + userId,null);
  }

  getCardByUserId(userId:number){
    return this.http.get<any>(environment.apiEndpoint + "/card/get-card-by-user-id/" + userId);
  }
}
