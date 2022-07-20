import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
@Component( {
    selector : 'admin-navbar',
    templateUrl : './navbar.html',
    styleUrls : ['./navbar.css']
})

export class AdminNavbar{
    constructor(private fireAuth : AngularFireAuth , private router : Router){}
    signOut():void {
        localStorage.removeItem('admin')
        this.fireAuth.signOut();
        this.router.navigate(['AdminPaneLogin'])
        
    }
}
