import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/pages/404/404.component';
import { HomeComponent } from './components/pages/home/home.component';
import { About } from './components/pages/about/about.component';
import { RegisterComponent } from './components/user/register/user-register.component';
import { LoginComponent } from './components/user/login/user-login.component';
import { AccountComponent } from './components/user/account/account.component';
import { CheckoutGuard, UserAuthGuard } from './services/user/auth/auth.guard';
import { AdminAuthGuard , AdminLoginGuard } from './services/admin/guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { AdminLogin } from './components/admin/login/admin-login.component';
import { ProductActions } from './components/admin/actions/actions-form.component';
import { Contact } from './components/pages/contact/contact.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { ProductDetails } from './components/pages/products/details/product-details.component';
import { UserLoginGuard } from './services/user/auth/auth.guard';
import { TicketsComponent } from './components/pages/tickets/tickets.component';
import { MailComponent } from './components/pages/mail/mail.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { UpdateProduct } from './components/admin/actions/update/update-product.component';
import { OfferComponent } from './components/pages/offer/offer.component';
import { ActiveOffers } from './components/pages/offer/active-offers/active-offers';
import { ForgotPassword } from './components/user/forgot-password/forgot-password';
import { AnonymousPay } from './components/pages/checkout/anonymous-pay/anonymous-pay.component';
const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path : 'Administration' , component : AdminComponent , canActivate : [AdminAuthGuard]},
  {path : 'Administration/Actions' , component : ProductActions , canActivate : [AdminAuthGuard]},
  {path:'urunler' , component : ProductsComponent},
  {path: 'AdminPaneLogin' , component : AdminLogin , canActivate : [AdminLoginGuard]},
  {path : 'urunler/:slug' , component : ProductDetails},
  {path:'anasayfa' , component: HomeComponent},
  {path : 'hakkimizda' , component : About},
  {path : 'iletisim' , component: Contact},
  {path: 'uyeol' , component: RegisterComponent , canActivate : [UserLoginGuard]},
  {path: 'giris' , component: LoginComponent , canActivate : [UserLoginGuard]},
  {path : 'hesabim' , component: AccountComponent , canActivate : [UserAuthGuard]},
  {path: 'Administration/Tickets' , component : TicketsComponent , canActivate : [AdminAuthGuard]},
  {path: 'Administration/Mail' , component: MailComponent, canActivate : [AdminAuthGuard]},
  {path : 'Administration/Orders' , component : OrdersComponent, canActivate : [AdminAuthGuard]},
  {path: 'Administration/Update' , component : ProductActions , canActivate : [AdminAuthGuard]},
  {path: 'Administration/Offer' , component : OfferComponent , canActivate : [AdminAuthGuard]},
  {path:'Administration/ActiveOffers' , component: ActiveOffers , canActivate : [AdminAuthGuard]},
  {path : 'Administration/Update/:slug' , component: UpdateProduct , canActivate : [AdminAuthGuard]},
  {path : 'sifremi-sifirla' , component: ForgotPassword},
  {path : 'sepet' , component: CheckoutComponent , canActivate : [CheckoutGuard]},
  {path : 'sepet/misafir' , component : AnonymousPay},
  {path: '**' , component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
