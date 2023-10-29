import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyhttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(localStorage.getItem('etoken')!==null){
      const mytoken:any={
        token:localStorage.getItem('etoken')
      }
      request= request.clone({
        setHeaders:mytoken
      })
    }
    return next.handle(request);
  }
}
