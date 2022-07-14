import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth/auth.service";
import { UserService } from "src/app/services/user/user.service";
@Component({
    templateUrl : './register.component.html',
    styleUrls : ['./register.component.css'],
    selector : 'register'
})

export class RegisterComponent {
    constructor(private UserService : UserService , private router : Router ,private authservice : AuthService){}
    //registerUser : User = {id: 0 , isLoggedIn:false , name : '' , surname : '' , password : '', phone: 0 , mail: '' , gender : '' , address : ''}
    handleRegister(input : User) : void {
        this.authservice.register(input)
        this.router.navigate(['Login']);
    }
}