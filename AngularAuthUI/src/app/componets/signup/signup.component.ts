import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import validateform from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';

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

  constructor(
    private fb:FormBuilder,
    private auth:AuthService,
    private router:Router,
    private toast:NgToastService){}

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
      // console.log(this.signupForm.value)
      // Send the obj to db 
      // perform logic for signup
      this.auth.signUp(this.signupForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message)
          this.toast.success({detail:"SUCCESS", summary:res.message,duration:5000});
          this.signupForm.reset();
          this.router.navigate(['login'])
        }),
        error:(err=>{
          alert(err?.error.message)
          this.toast.error({detail:"ERROR", summary:err?.error.message,duration:5000});
      })
    })

    }else{
      
      //src/app/helpers/validateform and logic for throwing errors
      validateform.validateAllFormFields(this.signupForm)
      this.toast.success({detail:"SUCCESS", summary:"Your form is invalid",duration:5000});
      //alert("Your form is invalid")
    }
  }

  

}
