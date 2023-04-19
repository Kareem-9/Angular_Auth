import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Iemployee } from 'src/app/iemployee';
import {MatSort} from '@angular/material/sort';
import { ApiService } from 'src/app/services/api.service';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  allEmployees:Iemployee[]= [];
  displayedColumns: any[] = ['id', 'name', 'company', 'email', 'mobile','dateOfBirth','gender','salary','location','action'];
  datasource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private s_employee : ApiService,
    public dialog: MatDialog,
    private toast: NgToastService){}


  ngOnInit():void{
    this.getAllEmployees()
    
  }

  getAllEmployees(){
    this.s_employee.getAll().subscribe((data)=>
    {
      this.allEmployees = data;

      this.datasource = new MatTableDataSource(this.allEmployees);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      console.log(this.allEmployees)
    })

  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  openDeleteModel(id:number){
   const dialogRef = this.dialog.open(DeleteEmployeeComponent,{
      width: '250px',
      data:{id},
    });
    dialogRef.afterClosed().subscribe((result)=>{
      if(result ){
        this.allEmployees = this.allEmployees.filter((_)=>_.id != id);
        this.toast.success({ detail: "Success Message", summary: "Employee deleted successfully" })

      }
    })

  }

}
