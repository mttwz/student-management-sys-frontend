import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor {

  tokenIgnore: String[] = ["login", "register-student", "validate-jwt"]
  

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiPath :String = req.url.toString().split("api")[1];
    let target :String = apiPath.split("/")[apiPath.split("/").length-1];

    console.log(target)

    if (!this.tokenIgnore.includes(target)) {
      console.log(this.tokenIgnore.includes(target))
    
      let localStorageObj = JSON.parse(localStorage.getItem("credentials") || "{ }");
      const userToken = localStorageObj.jwt;
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization ', userToken),
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req);

  }
}
