import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iemployee } from '../iemployee';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7114/api/User';

  constructor(private http:HttpClient) { }

  
  getUsers(){
    return this.http.get<any>(this.baseUrl);
  }

  //get all records
  getAll():Observable<Iemployee[]>{
    return this.http.get<Iemployee[]>("http://localhost:3000/Employees");
  }
  //Add records
  Create(payload:Iemployee):Observable<Iemployee>{
    return this.http.post<Iemployee>("http://localhost:3000/Employees",payload);
  }

  //get records by Id
  getbyId(id:number):Observable<Iemployee>{
    return this.http.get<Iemployee>(`http://localhost:3000/Employees/${id}` );
  }
  //Update the Records
  update(payload:Iemployee):Observable<Iemployee>{
    return this.http.put<Iemployee>(`http://localhost:3000/Employees/${payload.id}`,payload);
  }

  //Delete records
  delete(id:number){
    return this.http.delete(`http://localhost:3000/Employees/${id}`);
  }
}
