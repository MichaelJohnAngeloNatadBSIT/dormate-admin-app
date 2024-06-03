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
  payment_total: any;
  payment_count: any;
  formattedTotalAmount: string

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
    this.retrievePaymentTotal();
    this.retrievePaymentCount();
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

  async retrievePaymentCount() {
    try {
      this.payment_count = await this.adminService.getCountPayment().toPromise();
      console.log(this.payment_count);
    } catch (error) {
      console.error(error);
    }
  }

  async retrievePaymentTotal() {
    try {
      this.payment_total= await this.adminService.getTotalPayment().toPromise();
      console.log(this.payment_total)
      this.formattedTotalAmount = this.formatTotalAmount(this.payment_total.totalAmount);

    } catch (error) {
      console.error(error);
    }
  }
  
  formatTotalAmount(amount: number): string {
    const amountStr = amount.toString();
    const truncatedAmount = amountStr.slice(0, -2); // Remove last 2 digits
    const finalAmount = Number(truncatedAmount).toFixed(2); // Ensure 2 decimal places
    return finalAmount;
  }

}
