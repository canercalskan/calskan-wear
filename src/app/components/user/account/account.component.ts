import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UserService } from "src/app/services/user/user.service";
import Swal from "sweetalert2";
@Component({
    templateUrl : './account.component.html',
    styleUrls : ['./account.component.css'],
    selector : 'account'
})

export class AccountComponent implements OnInit {
    constructor(private fireAuth : AngularFireAuth, private UserService : UserService){}
    ngOnInit(): void {
        this.fireAuth.user.subscribe( u => {
            if(u?.emailVerified) {
                Swal.fire('Doğrulandı','Hesabınız doğrulandı, keyifli alışverişler!','success')
            }
        })
        this.UserService.verifyEmail();
    }
}