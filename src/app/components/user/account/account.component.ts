import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UserService } from "src/app/services/user/user.service";
import Swal from "sweetalert2";
import { AccountNavbar } from "src/app/layout/account-sidebar/account-navbar";
import { User } from "src/app/models/user.model";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
@Component({
    templateUrl : './account.component.html',
    styleUrls : ['./account.component.css'],
    selector : 'account'
})

export class AccountComponent implements OnInit {
    currentUser! : User
    constructor(private fireAuth : AngularFireAuth, private UserService : UserService , public accountNavbar : AccountNavbar , private db : AngularFireDatabase){}
    ngOnInit(): void {
        this.accountNavbar.showMyInfo()
        this.fireAuth.user.subscribe(u => {
        this.db.list<User>('users').valueChanges().subscribe(response => {
            response.forEach(user => {
                if(u?.uid === user.uid) {
                    this.currentUser = user;
                }
            })
        })
    })
  }
}