import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Navbar } from './layout/navbar/navbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NotFoundComponent } from './components/pages/404/404.component';
import { Footer } from './layout/footer/footer';
@NgModule({
  declarations: [
    AppComponent,
    Navbar , 
    HomeComponent,
    NotFoundComponent,
    Footer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
