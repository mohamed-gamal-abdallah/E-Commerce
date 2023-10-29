import { Injectable } from '@angular/core';
import{HttpClient}from"@angular/common/http"
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient ) { }
  userInfo:any

  register(userData:object):Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup",userData)
  }


login(userData:object):Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin",userData)
  }



  decodeUser(): void {
    const encode = localStorage.getItem('etoken');

    if (encode !== null) {
      //tmamm

      const decode = jwtDecode(encode);

      this.userInfo = decode;
    }
  }
}
