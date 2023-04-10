import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
    private rs:ApiService, @Inject(MAT_DIALOG_DATA) public data:any) {}

ngOnInit(): void{
}
confirmDelete(){
  this.rs.delete(this.data.id).subscribe(()=>{
    this.dialogRef.close(this.data.id)
  })
  
}

}
