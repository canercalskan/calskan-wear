import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
@Component({
    templateUrl : './account.component.html',
    styleUrls : ['./account.component.css'],
    selector : 'account'
})

export class AccountComponent implements OnInit {
    user! : string;
    // userMail! : string
    // uid! : string
    constructor(private fireAuth : AngularFireAuth){}
    ngOnInit(): void {
        this.fireAuth.currentUser.then(u => {this.user = u?.displayName!})
        // this.fireAuth.currentUser.then(activeUser => {
        //     this.userName = activeUser?.displayName!;
        //     this.userMail = activeUser?.email;
        // })
    }
}