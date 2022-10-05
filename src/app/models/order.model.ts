import { Item } from "./item.model";
import { Offer } from "./offer.model";
import { User } from "./user.model";
export class OrderModel {
    items! : Item[];
    total! : number;
    user! : string;
    //user! : User;
    offer! : Offer;
    date! : string;
}