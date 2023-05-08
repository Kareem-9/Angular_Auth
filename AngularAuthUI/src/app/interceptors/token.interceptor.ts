import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Route, Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,
    private toast: NgToastService,
    private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //we have request first,later modify and sent it.
    const myToken = this.auth.getToken(); //Append to header
    //Mytoken modify such a way based on requirment, and it send  backend  
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` } // "Bearer " +myToken
        // setHeaders: {Authorization: 'kareem cool'}
      })
    }

    //For token expire time set on backend,& Angular
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // this.toast.warning({ detail: "Warning", summary: "Token is expired,Please Login again" });
            // this.router.navigate(['login'])
           return this.handleUnAuthorizedError(request, next)
          }
        }
        return throwError(() => new Error("Some other error occured!"))
      })
    );
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokenApiModel)
      .pipe(
        switchMap((data: TokenApiModel) => {
          this.auth.storeRefreshToken(data.refreshToken);
          this.auth.storeToken(data.accessToken);
          req = req.clone({
            setHeaders: { Authorization:`Bearer ${data.accessToken}` }
          })
          return next.handle(req);
        }),
        catchError((err) => {
          return throwError(() => {
            this.toast.warning({ detail: "Warning", summary: "Token is expired! Please Login again" });
            this.router.navigate(['login'])
          })
        })
      )

  }
}
