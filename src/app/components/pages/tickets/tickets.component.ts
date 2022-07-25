import { Component, OnInit } from "@angular/core";
import { Ticket } from "src/app/models/ticket.model";
import { AdminService } from "src/app/services/admin/admin.service";
import { map } from "rxjs";
@Component({
    styleUrls : ['./tickets.component.css'],
    templateUrl : './tickets.component.html',
    selector : 'tickets'
})

export class TicketsComponent implements OnInit{
    constructor(private AdminService : AdminService){}
    tickets! : any[];
    ngOnInit(): void {
        this.AdminService.getTickets()
        .snapshotChanges()
        .pipe(
          map((changes) =>
            changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
          )
        )
        .subscribe((tickets) => {
          this.tickets = tickets;
        });
    }
    deleteTicket(ticket : Ticket) {
        console.log(ticket.key)
        this.AdminService.deleteTicket(ticket.key).then(() => {alert('Silindi')}).catch(err => {alert(err)})
    }
}