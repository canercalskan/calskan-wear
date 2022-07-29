import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin/admin.service";
@Component({
    styleUrls : ['./orders.component.css'],
    templateUrl : './orders.component.html',
    selector : 'orders'
})

export class OrdersComponent implements OnInit{
    orderList! : any;
    constructor(private AdminService : AdminService){}
    ngOnInit(): void {
        this.AdminService.getOrders().valueChanges().subscribe(response => {
            response.forEach(i => {
               i.total = +i.total.toFixed(2);
            })
            this.orderList = response;
        })
        console.log(this.orderList)
    }
}