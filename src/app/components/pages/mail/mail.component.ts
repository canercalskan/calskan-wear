import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin/admin.service";
@Component({
    styleUrls : ['./mail.component.css'],
    templateUrl:'./mail.component.html',
    selector : 'mail'
})

export class MailComponent implements OnInit{
    mailList! : any[]
    constructor(private AdminService : AdminService){}
    ngOnInit(): void {
        this.AdminService.getMailList().valueChanges().subscribe(list => {
            this.mailList = list;
        })
    }
}