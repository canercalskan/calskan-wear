import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/pages/404/404.component';
import { HomeComponent } from './components/pages/home/home.component';
import { About } from './components/pages/about/about';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { AccountComponent } from './components/user/account/account.component';
import { AuthGuard } from './services/auth/auth.guard';
const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path:'Home' , component: HomeComponent},
  {path : 'About' , component : About},
  {path: 'Register' , component: RegisterComponent},
  {path: 'Login' , component: LoginComponent},
  {path : 'Account' , component: AccountComponent , canActivate : [AuthGuard]},
  {path: '**' , component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
