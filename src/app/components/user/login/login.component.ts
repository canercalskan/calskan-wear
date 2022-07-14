import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/models/user.model";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
    templateUrl:'./login.component.html',
    styleUrls: ['./login.component.css'],
    selector : 'login',
})

export class LoginComponent {
    constructor( private router : Router , private authservice : AuthService){}
    loginError : boolean = false;
    handleLogin(user:User) {
    this.authservice.login(user)
    if(!(localStorage.getItem('isLoggedIn') == 'true')) {
        this.loginError = true;
    }
    else {
        this.router.navigate(['Account'])
    }
    console.log(this.loginError)
 }
}