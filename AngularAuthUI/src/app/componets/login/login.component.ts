import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import validateForm from 'src/app/helpers/validateform';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string='password' //Password hide
  isText:boolean = false;
  eyeIcon:string="fa fa-eye-slash";
  //Declare the login form 
  loginForm!:FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password:['',Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type ="password";
  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      // Send the obj to db

    }else{
      
      //throw the error using toaster and with required fields
      validateForm.validateAllFormFields(this.loginForm)
      alert("Your form is invalid")
    }
  }

  
}
