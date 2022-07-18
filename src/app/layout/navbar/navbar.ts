import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Item } from "src/app/models/item.model";
@Component({
    selector:'ng-navbar',
    styleUrls : ['./navbar.css'],
    templateUrl : './navbar.html'
})
export class Navbar {
    constructor(private router : Router){}
    cartItems : Array<Item> = [];
    logout() {
        localStorage.removeItem('isLoggedIn')
        this.router.navigate([this.router.url]);
    }
}