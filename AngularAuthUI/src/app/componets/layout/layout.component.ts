import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatatriggeringService } from 'src/app/services/datatriggering.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent  implements OnInit{
  //userName :any=''

  public fullName : string = "";
  constructor(private http:HttpClient,
    private dataTrigger:DatatriggeringService,
    private auth:AuthService,
    private userStore: UserStoreService){
    //this.getUserName()
  }

  ngOnInit() {
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      let fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    })
  }

  //UserName on Navbar its another method
  // getUserName(){
  //   this.dataTrigger.getUserName().subscribe((data:any)=>{
  //     this.userName=data
  //  })
  // }



  isSidenavOpened = false;

  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  //logout, to use this function Optional
  logout(){
    this.auth.signOut();
  }
} 

