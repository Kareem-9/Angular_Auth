import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
 public userName :any

  constructor(private http:HttpClient){
    this.getUsername();
  }

  getUsername() {
    this.http.get<any>("https://localhost:7114/api/User/authenticate").subscribe((user: any) =>{
      this.userName = user.userName
    })
  }

  isSidenavOpened = false;

  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }
}
