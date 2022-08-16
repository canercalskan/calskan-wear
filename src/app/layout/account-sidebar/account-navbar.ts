import { Component, Injectable, NgModule } from "@angular/core";
import { NgModel } from "@angular/forms";

@Component({
    templateUrl : './account-navbar.html',
    styleUrls : ['./account-navbar.css'],
    selector : 'account-navbar',
})

@Injectable({providedIn:"root"})

export class AccountNavbar {
    myInfoClicked : boolean = false;
    myAddressesClicked : boolean = false;
    myOffersClicked : boolean = false;
    myOrdersClicked : boolean = false;
    constructor() {}
    showMyInfo() : void {
        this.myInfoClicked = true;
        this.myAddressesClicked = false;
        this.myOffersClicked = false;
        this.myOrdersClicked = false;
    }
    showMyAddresses() : void {
        this.myAddressesClicked = true;
        this.myInfoClicked = false;
        this.myOffersClicked = false;
        this.myOrdersClicked = false;
    }
    showMyOffers() : void {
        this.myOffersClicked = true;
        this.myOrdersClicked = false;
        this.myInfoClicked = false;
        this.myAddressesClicked = false;
    }
    showMyOrders() : void {
        this.myOrdersClicked = true;
        this.myOffersClicked = false;
        this.myInfoClicked = false;
        this.myAddressesClicked = false;
    }
}