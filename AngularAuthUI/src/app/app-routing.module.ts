import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './componets/add-employee/add-employee.component';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { DialogComponent } from './componets/dialog/dialog.component';
import { EditEmployeeComponent } from './componets/edit-employee/edit-employee.component';
import { LayoutComponent } from './componets/layout/layout.component';
import { LoginComponent } from './componets/login/login.component';
import { SignupComponent } from './componets/signup/signup.component';
import { ViewEmployeeComponent } from './componets/view-employee/view-employee.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'layout', component:LayoutComponent, canActivate:[AuthGuard],

  children:[
    {path: '',component:DashboardComponent},
 {path:'employee',component:DialogComponent},
 {path:'dashboard',component:DashboardComponent},
 {path:'add-employee',component:AddEmployeeComponent},
 {path:'edit-employee/:id',component:EditEmployeeComponent},
 {path:'view-employee/:id',component:ViewEmployeeComponent}
 ]},  

  {path:'employee',component:DialogComponent, canActivate:[AuthGuard] },
   {path:'add-employee',component:AddEmployeeComponent},
   {path:'edit-employee/:id',component:EditEmployeeComponent},
   {path:'view-employee/:id',component:ViewEmployeeComponent}
   
   
     
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
