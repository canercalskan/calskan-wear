import { Component } from "@angular/core";
import { Router } from "@angular/router";
@Component({
    selector:'ng-navbar',
    styleUrls : ['./navbar.css'],
    templateUrl : './navbar.html'
})
export class Navbar {
    constructor(private router : Router){}
    logout() {
        localStorage.removeItem('isLoggedIn')
        this.router.navigate([this.router.url]);
    }
}