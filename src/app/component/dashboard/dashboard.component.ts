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

  async retrieveDormCount() {
    try {
      this.dorm_count = await this.adminService.getCountDorm().toPromise();
    } catch (error) {
      console.error(error);
    }
  }
  

  async retrieveApprovedDormCount() {
    try {
      const data = await this.adminService.getCountDormApproved().toPromise();
      this.dorm_count_approved = data;
    } catch (error) {
      console.error(error);
    }
  }
  async retrieveUserCount() {
    try {
      this.user_count = await this.adminService.getCountUser().toPromise();
    } catch (error) {
      console.error(error);
    }
  }
  
  async retrieveScheduleCount() {
    try {
      this.schedule_count = await this.adminService.getCountSchedule().toPromise();
    } catch (error) {
      console.error(error);
    }
  }
  

}
