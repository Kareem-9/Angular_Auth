import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private userPayload:any
  private baseUrl:string = "https://localhost:7114/api/User/";

  constructor(
    private http: HttpClient,
    private router:Router,
    ) { 
      this.userPayload = this.decodedToken();
    }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj)
  }

  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('accesstoken',tokenValue)
  }

  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken',tokenValue)
  }

  //For using in interceptor
  getToken(){
    return localStorage.getItem('accesstoken')
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  //If token there return true, otherwise false.
  isLoggedIn():boolean{         //string to boolean add !!
     return!! localStorage.getItem('accesstoken');
  }

  //Decode the token for Name set an nav bar
  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken(){
    if(this.userPayload){
    return this.userPayload.unique_name;
  }
}

  getRoleFromToken(){
    if(this.userPayload){
    return this.userPayload.role;
  }
}

  renewToken(tokenApi:TokenApiModel){
    return this.http.post<any>(`https://localhost:7114/api/User/refresh`, tokenApi);
  }




  //Timer based on JWT Token

  // setTimer(timerValue: number) {
  //   const expiration = new Date();
  //   expiration.setMinutes(expiration.getMinutes() + timerValue);

  //   const token = localStorage.getItem('jwtToken');
  //   const headers = { Authorization: `Bearer ${token}` };
  //   const body = { expiration: expiration };

  //   this.http.put(`${this.baseUrl}authenticate`, body, { headers }).subscribe(response => {
  //     console.log(response);
  //   });
  // }

}
