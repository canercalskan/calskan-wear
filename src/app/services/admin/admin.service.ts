import { Injectable, NgModule } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Admin } from "src/app/models/admin.model";
@Injectable({providedIn:"root"})
@NgModule()

export class AdminService {
    constructor(private fireAuth : AngularFireAuth) {}
    authAdmin(admin : Admin) : Promise<void> {
        return this.fireAuth.signInWithEmailAndPassword(admin.mail , admin.password).then()
    }
}