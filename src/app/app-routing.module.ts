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
import { ProductsComponent } from './components/pages/products/products.component';
import { ProductDetails } from './components/pages/products/details/details.component';
import { UserLoginGuard } from './services/user/auth/auth.guard';
import { TicketsComponent } from './components/pages/tickets/tickets.component';
import { MailComponent } from './components/pages/mail/mail.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path : 'Administration' , component : AdminComponent , canActivate : [AdminAuthGuard]},
  {path : 'Administration/Actions' , component : ProductActions , canActivate : [AdminAuthGuard]},
  {path:'Products' , component : ProductsComponent},
  {path: 'AdminPaneLogin' , component : AdminLogin , canActivate : [AdminLoginGuard]},
  {path : 'Products/:productKey' , component : ProductDetails},
  {path:'Home' , component: HomeComponent},
  {path : 'About' , component : About},
  {path : 'Contact' , component: Contact},
  {path: 'Register' , component: RegisterComponent , canActivate : [UserLoginGuard]},
  {path: 'Login' , component: LoginComponent , canActivate : [UserLoginGuard]},
  {path : 'Account' , component: AccountComponent , canActivate : [UserAuthGuard]},
  {path: 'Administration/Tickets' , component : TicketsComponent , canActivate : [AdminAuthGuard]},
  {path: 'Administration/Mail' , component: MailComponent, canActivate : [AdminAuthGuard]},
  {path : 'Administration/Orders' , component : OrdersComponent, canActivate : [AdminAuthGuard]},
  {path : 'Checkout' , component: CheckoutComponent},
  {path: '**' , component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
