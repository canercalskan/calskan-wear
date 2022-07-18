import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/models/user.model";
import { environment } from "src/environments/environment";
@NgModule()
@Injectable({providedIn:'root'})

export class UserService {
    constructor(private http: HttpClient){}
    registerUser(user : User) : Observable<User> {
        return this.http.post<User>(environment.dbUsers , user)
    }
    getUsers() : Observable<User[]> {
        return this.http.get<User[]>(environment.dbUsers);
    }
}