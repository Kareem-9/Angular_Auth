import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatatriggeringService {

  private userName = new BehaviorSubject<string>('');
  private email=new BehaviorSubject<boolean>(false)

  constructor() { }

  setuserName(userName: any){
    this.userName.next(userName)
  }

  getUserName(){
   return this.userName.asObservable();
  }

  setUserView(userview:boolean){
    this.email.next(userview)
  }

  getUserView(){
    return this.email.asObservable();
  }
}
