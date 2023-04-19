import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Route, Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService,
    private toast:NgToastService,
    private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //we have request first,later modify and sent it.
    const myToken = this.auth.getToken(); //Append to header
    //Mytoken modify such a way based on requirment, and it back  
  if(myToken){
    request = request.clone({
       setHeaders: {Authorization: `Bearer ${myToken}`} // "Bearer " +myToken
      // setHeaders: {Authorization: 'kareem cool'}
    })
  }

  return next.handle(request)

  // For token expire time set on backend,& Angular
  //   return next.handle(request).pipe(
  //   catchError((err:any)=>{
  //     if(err instanceof HttpErrorResponse){
  //       if(err.status === 401){
  //         this.toast.warning({detail:"Warning", summary:"Token is expired,Please Login again"});
  //         this.router.navigate(['login'])
  //       }
  //     }
  //     return throwError(()=> new Error("Some other error occured"))
  //   })
  //   );
  
   }
}
