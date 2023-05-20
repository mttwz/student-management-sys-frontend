import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router, private formBuilder: FormBuilder) { }

  public registerForm !: FormGroup;


  saveToken(obj: Object) {
    localStorage.setItem('credentials', JSON.stringify(obj));
  }

  register(registerForm:FormGroup) {
    let body = registerForm.value;
    return this.http.post<any>(environment.apiEndpoint + "/student/register-student", body);
  }


  login(loginForm:FormGroup){
    let body = loginForm.value;
    return this.http.post<any>(environment.apiEndpoint + "/auth/login", body);
  }

  setUserIsActivated(activationForm:FormGroup){
    let body = activationForm.value;
    return this.http.post<any>(environment.apiEndpoint + "/user/set-user-is-activated", body);
   
  }

  logOut() {
   localStorage.removeItem('credentials');
   this.router.navigate(["/"]);
  }

  validateJwt(){
    let localStorageObj = JSON.parse(localStorage.getItem("credentials") || "{ }");
    return this.http.post<any>(environment.apiEndpoint + "/auth/validate-jwt", localStorageObj);
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
