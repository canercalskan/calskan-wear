import { Injectable, NgModule } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { Admin } from "src/app/models/admin.model";
@Injectable({providedIn:"root"})
@NgModule()

export class AdminService {
    constructor(private fireAuth : AngularFireAuth , private db : AngularFireDatabase) {}
    authAdmin(admin : Admin) : Promise<void> {
        return this.fireAuth.signInWithEmailAndPassword(admin.mail , admin.password).then()
    }
    getTickets(){
        this.db.list('contacts').valueChanges().subscribe(i => {console.log(i)})
        //console.log()
    }
}