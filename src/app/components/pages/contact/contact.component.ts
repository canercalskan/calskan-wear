import { Component, OnInit } from "@angular/core";
import { Ticket } from "src/app/models/ticket.model";
import { UserService } from "src/app/services/user/user.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import Swal from "sweetalert2";

@Component({
    templateUrl : './contact.component.html',
    styleUrls : ['./contact.component.css'],
    selector : 'contact'
})

export class Contact implements OnInit{
    constructor(private UserService : UserService , private fireAuth : AngularFireAuth){}
    handleContact(form : Ticket) : void {
        this.UserService.contact(form)
        Swal.fire('Talebiniz gönderildi' , 'En kısa sürede mail üzerinden iletişime geçilecektir', 'success')
    }
    loggedIn : boolean = false;
    userName! : string
    userMail! : string
    ngOnInit(): void {
        this.fireAuth.user.subscribe(u => {
            this.loggedIn = true;
            this.userMail = u?.email!;
            this.userName = u?.displayName!;
            console.log(this.userName);
            console.log(this.userMail);
        })
    }
}

