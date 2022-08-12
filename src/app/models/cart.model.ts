import { Item } from "./item.model";
import { Offer } from "./offer.model";
export class Cart {
    items! : Item[];
    offer! : Offer;
    total! : number;
}