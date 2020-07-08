import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthGuard } from './auth.guard';


 const routes: Routes = [
    {path:'',component:AdminComponent, canActivate:[AuthGuard], loadChildren: ()=>import('./layouts/dashboard.module').then(e=>e.DashboardModule)},
    {path:'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
