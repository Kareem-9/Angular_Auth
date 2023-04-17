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
    return this.http.get<Iemployee[]>("https://localhost:7114/api/Employee/getAll");
  }
  //Add records
  Create(payload:Iemployee):Observable<Iemployee>{
    return this.http.post<Iemployee>("https://localhost:7114/api/Employee/add",payload);
  }

  //get records by Id
  getbyId(id:number):Observable<Iemployee>{
    return this.http.get<Iemployee>(`https://localhost:7114/api/Employee/getById/${id}` );
  }
  //Update the Records
  update(payload:Iemployee):Observable<Iemployee>{
    // return this.http.put<Iemployee>(`https://localhost:7114/api/controller/update/${payload.id}`,payload);
    return this.http.put<Iemployee>(`https://localhost:7114/api/Employee/update/`,payload);

  }

  //Delete records
  delete(id:number){
    console.log(id);
    return this.http.delete(`https://localhost:7114/api/Employee/delete/${id}`);
  }
  
}
