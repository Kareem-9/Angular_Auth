import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const myToken = this.auth.getToken(); //Append to header
    //Mytoken modify such a way get the append to header  > the req set the headers
  if(myToken){
    request = request.clone({
       setHeaders: {Authorization: `Bearer ${myToken}`} // "Bearer " +myToken
      // setHeaders: {Authorization: 'kareem cool'}
    })
  }
    return next.handle(request);
  }
}
