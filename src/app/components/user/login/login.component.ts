import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/models/user.model";

@Component({
    templateUrl:'./login.component.html',
    styleUrls: ['./login.component.css'],
    selector : 'login',
})

export class LoginComponent {
    constructor(http : HttpClient){}
    handleLogin(user:User) {}
}