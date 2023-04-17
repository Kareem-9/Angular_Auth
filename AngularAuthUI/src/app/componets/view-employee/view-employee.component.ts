import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Iemployee } from 'src/app/iemployee';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent {
  employeeRecords:Iemployee = {
    id:0,
    name: '',
    company: '',
    email: '',
    salary:0,
    mobile: '',
    gender: '',
    location: '',
    dateOfBirth: new Date(),
  }

  constructor(private rs :ApiService, 
    private route:ActivatedRoute,
    private router:Router,
    private toast: NgToastService){

  }
  
  ngOnInit():void {
    this.route.paramMap.subscribe((params)=>{
      let id = Number(params.get('id')) //get the id
      this.getById(id);
      console.log(this.getById(id))
    })
  }

  getById(id:number){
    this.rs.getbyId(id).subscribe((data)=>{
      this.employeeRecords = data;
    })
  }

  // updateRecords(){
  //   // this.rs.update(this.employeeRecords).subscribe(()=>{
  //   //   this.toast.success({ detail: "Success Message", summary: "Employee updated successfully" })
  //     this.router.navigate(["layout/employee"])
  // //  })
  // }

}
