import { Component, OnInit } from "@angular/core";
import { Ticket } from "src/app/models/ticket.model";
import { AdminService } from "src/app/services/admin/admin.service";
import { map } from "rxjs";
import Swal from "sweetalert2";

@Component({
    styleUrls : ['./tickets.component.css'],
    templateUrl : './tickets.component.html',
    selector : 'tickets'
})

export class TicketsComponent implements OnInit{
    constructor(private AdminService : AdminService){}
    tickets! : any[];
    count = 0;
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
      Swal.fire('Emin Misiniz?','Ticket silindikten sonra geri kurtarılamaz', 'warning').then((willDelete) => {
        if(willDelete) {
          Swal.fire('Ticket Silindi' , '', 'success')
          this.AdminService.deleteTicket(ticket.key);
        }
      })
    }
}