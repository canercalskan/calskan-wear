import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Item } from "src/app/models/item.model";
import { UserService } from "src/app/services/user/user.service";
@Component({
    selector : 'last-seen-products',
    styleUrls : ['./last-seen-products.component.css'],
    templateUrl : './last-seen-products.component.html'
})

export class LastSeenProductsComponent implements OnInit{
   
    constructor(private db : AngularFireDatabase , private UserService : UserService){}
    ngOnInit(): void {
       
        // console.log(this.UserService.getLastSeenProducts())
    }
}