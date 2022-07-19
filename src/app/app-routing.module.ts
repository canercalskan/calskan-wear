import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/pages/404/404.component';
import { HomeComponent } from './components/pages/home/home.component';
import { About } from './components/pages/about/about';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { AccountComponent } from './components/user/account/account.component';
import { UserAuthGuard } from './services/user/auth/auth.guard';
import { AdminAuthGuard , AdminLoginGuard } from './services/admin/guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { AdminLogin } from './components/admin/login/login.component';
import { ProductActions } from './components/admin/actions/product-actions';
import { Contact } from './components/pages/contact/contact';
import { ProductsComponent } from './components/admin/products/products.component';

const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path : 'Administration' , component : AdminComponent , canActivate : [AdminAuthGuard]},
  {path : 'Administration/Actions' , component : ProductActions , canActivate : [AdminAuthGuard]},
  {path:'Administration/Products' , component : ProductsComponent , canActivate : [AdminAuthGuard]},
  {path: 'AdminPaneLogin' , component : AdminLogin , canActivate : [AdminLoginGuard]},
  {path:'Home' , component: HomeComponent},
  {path : 'About' , component : About},
  {path : 'Contact' , component: Contact},
  {path: 'Register' , component: RegisterComponent},
  {path: 'Login' , component: LoginComponent},
  {path : 'Account' , component: AccountComponent , canActivate : [UserAuthGuard]},
  {path: '**' , component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
