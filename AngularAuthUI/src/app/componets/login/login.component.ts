import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import validateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from 'src/app/app.component';
import { DatatriggeringService } from 'src/app/services/datatriggering.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = 'password' //Password hide
  isText: boolean = false;
  eyeIcon: string = "fa fa-eye-slash";
  //Declare the login form 
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private dataTrigger: DatatriggeringService,
    private userStore: UserStoreService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      TokenExpire: [0, Validators.required],
    })

  }


  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      //this.dataTrigger.setuserName(this.loginForm.value.username)
      // Send the obj to db
      // perform the logic for signup
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            console.log(res.message);
            this.loginForm.reset();
            //this.auth.storeToken(res.token);  //This one is store the token
            this.auth.storeToken(res.accessToken);
            this.auth.storeRefreshToken(res.refreshToken);
            const tokenPayload = this.auth.decodedToken();
            this.userStore.setFullNameForStore(tokenPayload.unique_name);
            this.userStore.setRoleForStore(tokenPayload.role);
            this.toast.success({ detail: "SUCCESS", summary: "Employee Login successfully", duration: 3000 });
            //localStorage.setItem('login','sucess')
            this.router.navigate(['layout'])
          },
          error: (err => {
            // alert(err?.error.message)
            this.toast.error({ detail: "ERROR", summary: "Something went wrong!", duration: 3000 });
            console.log(err);
          })
        })

    } else {

      //throw the error using toaster and with required fields
      validateForm.validateAllFormFields(this.loginForm)
      alert("Your form is invalid")
      this.toast.error({ detail: "Error", summary: "Your form is invalid", duration: 3000 });
    }
  }


}
