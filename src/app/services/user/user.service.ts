import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/models/user.model";
import { environment } from "src/environments/environment";
import { AngularFireDatabase , AngularFireList } from '@angular/fire/compat/database';
@NgModule()
@Injectable({providedIn:'root'})

export class UserService {
    constructor(private http: HttpClient , private db : AngularFireDatabase){}
    registerUser(user : User) : Observable<User> {
        return this.http.post<User>(environment.dbUsers , user)
    }
    getUsers() : Observable<User[]> {
        return this.http.get<User[]>(environment.dbUsers);
    }
    contact(form : object) : void {
         this.db.list('contacts').push(form)
    }
}