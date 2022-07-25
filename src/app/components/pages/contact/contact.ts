import { Component } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
@Component({
    templateUrl : './contact.html',
    styleUrls : ['./contact.css'],
    selector : 'contact'
})

export class Contact {
    constructor(private UserService : UserService){}
    handleContact(form : object) : void {
        console.log(form)
       this.UserService.contact(form)
    }
}