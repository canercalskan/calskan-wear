import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/pages/404/404.component';
import { HomeComponent } from './components/pages/home/home.component';
import { About } from './components/pages/about/about';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path:'Home' , component: HomeComponent},
  {path : 'About' , component : About},
  {path: 'Register' , component: RegisterComponent},
  {path: 'Login' , component: LoginComponent},
  {path: '**' , component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
