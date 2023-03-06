import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import validateform from 'src/app/helpers/validateform';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type: string='password' //Password hide
  isText:boolean = false;
  eyeIcon:string="fa fa-eye-slash";
  signupForm!: FormGroup;

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      userName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],

    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye": this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type ="password";
  }

  onSignup(){
    if(this.signupForm.valid){
      // perform logic for signup
      console.log(this.signupForm.value)
      // Send the obj to db

    }else{
      
      //logic for throwing errors
      validateform.validateAllFormFields(this.signupForm)
      //alert("Your form is invalid")
    }
  }

  

}
