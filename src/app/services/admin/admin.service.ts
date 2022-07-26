import { Injectable, NgModule } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { Admin } from "src/app/models/admin.model";
import { OrderModel } from "src/app/models/order.model";
import { Ticket } from "src/app/models/ticket.model";
@Injectable({providedIn:"root"})
@NgModule()

export class AdminService {
    constructor(private fireAuth : AngularFireAuth , private db : AngularFireDatabase) {}
    authAdmin(admin : Admin) : Promise<void> {
        return this.fireAuth.signInWithEmailAndPassword(admin.mail , admin.password).then()
    }
    getTickets(): AngularFireList<Ticket> {
        return this.db.list('contacts');
      }
    deleteTicket(key: string) : Promise<void> {
        return this.db.list('contacts').remove(key);
      }
      getMailList() : AngularFireList<string> {
        return this.db.list('subscribers')
      }
    getOrders() : AngularFireList<OrderModel> {
      return this.db.list<OrderModel>('orders');
    }
}