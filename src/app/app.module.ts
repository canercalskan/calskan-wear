import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Navbar } from './layout/navbar/user/normal-navbar/user-navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NotFoundComponent } from './components/pages/404/404.component';
import { Footer } from './layout/footer/footer.component';
import { About } from './components/pages/about/about.component';
import { RegisterComponent } from './components/user/register/user-register.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/user/login/user-login.component';
import { AngularFireModule} from '@angular/fire/compat';
import { AuthService } from './services/user/auth/auth.service';
import { AccountComponent } from './components/user/account/account.component';
import { CheckoutGuard, UserAuthGuard } from './services/user/auth/auth.guard';
import { UserService } from './services/user/user.service';
import { AdminComponent } from './components/admin/admin.component';
import { AdminService } from './services/admin/admin.service';
import { AdminLogin } from './components/admin/login/admin-login.component';
import { ItemsService } from './services/admin/items.service';
import { AdminNavbar } from './layout/navbar/admin/admin-navbar.component';
import { ProductActions } from './components/admin/actions/actions-form.component';
import { AdminAuthGuard , AdminLoginGuard} from './services/admin/guards/auth.guard';
import { Contact } from './components/pages/contact/contact.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { ProductDetails } from './components/pages/products/details/product-details.component';
import { UserLoginGuard } from './services/user/auth/auth.guard';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TicketsComponent } from './components/pages/tickets/tickets.component';
import { MailComponent } from './components/pages/mail/mail.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { CheckoutNavbar } from './layout/navbar/user/checkout-navbar/checkout-navbar.component';
import { UpdateProduct } from './components/admin/actions/update/update-product.component';
import { OfferComponent } from './components/pages/offer/offer.component';
import { ActiveOffers } from './components/pages/offer/active-offers/active-offers';
import { OfferSidebar } from './layout/offer-sidebar/offer-sidebar';
import { ForgotPassword } from './components/user/forgot-password/forgot-password';
import { AddressDataComponent } from './components/user/address-data/address-data';
const firebaseConfig = {
  apiKey: "AIzaSyBb5rDZjYMI5mtA9YJqt4fVfqhU8LC-7aA",
  authDomain: "test-b03cd.firebaseapp.com",
  databaseURL: "https://test-b03cd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-b03cd",
  storageBucket: "test-b03cd.appspot.com",
  messagingSenderId: "1086960920202",
  appId: "1:1086960920202:web:e5802d42d639843f732f73",
  measurementId: "G-2M1LJF1706"
};

@NgModule({
  declarations: [
    AppComponent,
    Navbar , 
    HomeComponent,
    NotFoundComponent,
    Footer,
    About , 
    RegisterComponent,
    LoginComponent,
    AccountComponent ,
    AdminComponent , 
    AdminLogin , 
    AdminNavbar  , 
    ProductActions, 
    ProductsComponent, 
    UpdateProduct, 
    OfferComponent, 
    ActiveOffers,
    OfferSidebar,
    Contact , 
    ProductDetails , 
    TicketsComponent , 
    MailComponent , 
    OrdersComponent, 
    CheckoutComponent , 
    CheckoutNavbar , 
    ForgotPassword,
    AddressDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthService , 
    UserAuthGuard , 
    AdminAuthGuard, 
    AdminLoginGuard,
    UserService , 
    AdminService , 
    ItemsService, 
    UserLoginGuard, 
    CheckoutGuard,
    AngularFireModule.initializeApp(firebaseConfig),
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
