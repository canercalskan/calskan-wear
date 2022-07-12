import { Component } from "@angular/core";
import { Router } from "@angular/router";
@Component({
    templateUrl : './404.component.html',
    styleUrls:['./404.component.css'],
    selector : 'not-found',
})
export class NotFoundComponent {
    constructor(private router: Router){}
    returnHome() : void {
        this.router.navigate(['Home'])
    }
}