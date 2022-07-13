import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/models/user.model";

@Component({
    templateUrl : './register.component.html',
    styleUrls : ['./register.component.css'],
    selector : 'register'
})

export class RegisterComponent {
    constructor(private http:HttpClient , private router : Router){}
    registerUser : User = {id: 0 , isLoggedIn:false , name : '' , surname : '' , password : '', phone: 0 , mail: '' , gender : '' , address : ''}
    handleRegister(input : User) : void {
        this.registerUser.name = input.name;
        this.registerUser.surname = input.surname;
        this.registerUser.id = input.id;
        this.registerUser.mail = input.mail;
        this.registerUser.password = input.password;
        this.registerUser.phone = input.phone;
        this.registerUser.gender = input.gender;
        console.log(this.registerUser)
        this.router.navigate(['Login'])
    }
}