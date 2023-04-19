import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private baseUrl:string = "https://localhost:7114/api/User/"
  constructor(private http: HttpClient,
    private router:Router,
    ) { }

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
    localStorage.setItem('token',tokenValue)
  }

  //For using in interceptor
  getToken(){
    return localStorage.getItem('token')
  }

  //If token there return true, otherwise false.
  isLoggedIn():boolean{         //string to boolean add !!
     return! localStorage.getItem('token');
  }
}
