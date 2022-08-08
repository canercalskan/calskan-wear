import { Item } from "./item.model";
export class OrderModel {
    items! : Item[];
    total! : number;
    user! : string;
}