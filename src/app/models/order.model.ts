import { Item } from "./item.model";
import { Offer } from "./offer.model";
export class OrderModel {
    items! : Item[];
    total! : number;
    user! : string;
    offer! : Offer;
    date! : string;
}