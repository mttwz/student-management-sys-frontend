import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router) { }


  saveToken(obj: Object) {
    localStorage.setItem('credentials', JSON.stringify(obj));
  }


  login(loginForm:FormGroup) {
    let body = loginForm.value;
    console.log(body)

    this.http.post<any>("http://127.0.0.1:8080/api/v1/auth/login", body)
      .subscribe(res => {
        this.saveToken(res)
        this.router.navigate(["dashboard"]);
      }, err => {
        console.log(err);
       
      })
  }

  logOut() {
   localStorage.removeItem('credentials'); 
  }

  validateJwt(){
    let localStorageObj = JSON.parse(localStorage.getItem("credentials") || "{ }");
    
    const resp = this.http.post<any>("http://127.0.0.1:8080/api/v1/auth/validatejwt", localStorageObj);
    return resp;
  }
  parseJwt() {
    let localStorageObj = JSON.parse(localStorage.getItem("credentials") || "{ }");
    let token = localStorageObj.jwt;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));


    return JSON.parse(jsonPayload);
  }
}
