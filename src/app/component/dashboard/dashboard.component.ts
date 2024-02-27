import { Component } from '@angular/core';
import { StorageService } from 'services/storage.service';
import { AdminService } from 'services/admin.service';
import { Admin } from 'interface/admin';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  admin: Admin;
  isUserLoggedIn: boolean;
  isLoggedIn = false;
  username:any;
  dorm_count: any;
  dorm_count_approved: any;
  user_count: any;
  schedule_count: any;

  constructor(
    private storageService: StorageService, 
    private adminService : AdminService,
  ){}

  async ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.admin = this.storageService.getUser();
      this.username = this.admin.username;
    }
    this.retrieveDormCount();
    this.retrieveUserCount();
    this.retrieveScheduleCount();
    this.retrieveApprovedDormCount();
    
  }

  retrieveDormCount(){
    this.adminService.getCountDorm().subscribe({
      next: (data) => {
        this.dorm_count = data;
      },
      error: (e) => console.error(e)
    });
  }

  retrieveApprovedDormCount(){
    this.adminService.getCountDormApproved().subscribe({
      next: (data) => {
        this.dorm_count_approved = data;
      },
      error: (e) => console.error(e)
    });
  }

  retrieveUserCount(){
    this.adminService.getCountUser().subscribe({
      next: (data) => {
        this.user_count = data;
      },
      error: (e) => console.error(e)
    });
  }

  retrieveScheduleCount(){
    this.adminService.getCountSchedule().subscribe({
      next: (data) => {
        this.schedule_count = data;
      },
      error: (e) => console.error(e)
    });
  }

}
