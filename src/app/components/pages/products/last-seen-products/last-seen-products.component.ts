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
    // lastSeenProducts : string[] = JSON.parse(localStorage.getItem('visitedProducts')!)
    // lastSeenProductsDetails : Item[] = []
    constructor(private db : AngularFireDatabase , private UserService : UserService){}
    ngOnInit(): void {
        // this.db.list<Item>('uploads').valueChanges().subscribe(response => {
        //     this.lastSeenProducts.forEach(key => {
        //         response = response.filter(product => product.key !== key)
        //     })
        //     this.lastSeenProductsDetails = response
        //     console.log(this.lastSeenProductsDetails)
        //     //UserService i kullan ve lastseenproductdetails'i oraya pushla
        // })
        console.log(this.UserService.getLastSeenProducts())
    }
}