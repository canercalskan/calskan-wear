import { Component, OnInit } from "@angular/core";
import { Admin } from "src/app/models/admin.model";
import { OrderModel  } from "src/app/models/order.model";
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
            this.orderList = response
        })
        console.log(this.orderList)
    }
}