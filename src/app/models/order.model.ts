import { Item } from "./item.model";
import { User } from "./user.model";
export class OrderModel {
    items! : Item[];
    total! : number;
    user! : string;
}