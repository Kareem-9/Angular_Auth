import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  constructor() { }

  public fullName$ = new BehaviorSubject<string>("")
  public role$ = new BehaviorSubject<string>("")

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role : string){
    return this.role$.next(role);
  }

  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(fullName : string){
    return this.fullName$.next(fullName);
  }
}
