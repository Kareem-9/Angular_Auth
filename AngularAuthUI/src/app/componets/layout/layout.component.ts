import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatatriggeringService } from 'src/app/services/datatriggering.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  userName :any=''

  constructor(private http:HttpClient,
    private dataTrigger:DatatriggeringService,
    private auth:AuthService){
    this.getUserName()
  }

  getUserName(){
    this.dataTrigger.getUserName().subscribe((data:any)=>{
      this.userName=data
   })
  }
  isSidenavOpened = false;

  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  //logout, to use this function Optional
  logout(){
    this.auth.signOut();
  }
}

