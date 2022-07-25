import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls : ['./admin.component.css']
})
export class AdminComponent {
    admin : string = localStorage.getItem('admin')!;
    constructor(private adminService : AdminService) {}
    ngOnInit() : void {
        this.adminService.getTickets();
    }
}
