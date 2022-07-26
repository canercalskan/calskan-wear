import { Component } from "@angular/core";
import { Ticket } from "src/app/models/ticket.model";
import { UserService } from "src/app/services/user/user.service";
import Swal from "sweetalert2";
@Component({
    templateUrl : './contact.html',
    styleUrls : ['./contact.css'],
    selector : 'contact'
})

export class Contact {
    constructor(private UserService : UserService){}
    handleContact(form : Ticket) : void {
        this.UserService.contact(form)
        Swal.fire('Talebiniz gönderildi' , 'En kısa sürede mail üzerinden iletişime geçilecektir', 'success')
    }
}

