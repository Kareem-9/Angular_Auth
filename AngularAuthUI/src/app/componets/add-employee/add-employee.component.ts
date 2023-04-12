import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Iemployee } from 'src/app/iemployee';
import { ApiService } from 'src/app/services/api.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
employeeRecords:Iemployee ={
  id: 0,
  name: '',
  company: '',
  salary:0,
  mobile: '',
  email: '',
  gender: '',
  location: '',
  dateOfBirth: new Date()
}
constructor(private es:ApiService, private router:Router,private toast: NgToastService) {}

addRecords(){
  this.es.Create(this.employeeRecords).subscribe(()=>{
    this.toast.success({ detail: "Success Message", summary: "Employee added successfully" })
    this.router.navigate(["layout/employee"])

  }, (): void => {
    alert("Something went wrong")
    this.toast.error({ detail: "Error Message", summary: "Something Went Wrong !!" })
  })
}

}
