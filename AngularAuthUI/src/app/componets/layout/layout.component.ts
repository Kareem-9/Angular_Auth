import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DatatriggeringService } from 'src/app/services/datatriggering.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  userName :any=''

  constructor(private http:HttpClient,
    private dataTrigger:DatatriggeringService){
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
}
