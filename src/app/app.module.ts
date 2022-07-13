import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Navbar } from './layout/navbar/navbar';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NotFoundComponent } from './components/pages/404/404.component';
import { Footer } from './layout/footer/footer';
import { About } from './components/pages/about/about';
import { RegisterComponent } from './components/user/register/register.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/user/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    Navbar , 
    HomeComponent,
    NotFoundComponent,
    Footer,
    About , 
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
