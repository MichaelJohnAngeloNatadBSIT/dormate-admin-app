import { Component, OnInit } from '@angular/core';
import { Payment } from 'interface/payment';
import { AdminService } from 'services/admin.service';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  payments: Payment[];
  itemsPerPage = 5; // Adjust as per your requirement
  currentPage = 1;
  totalPages : number;
  paymentsLength : number;

  constructor(
    private adminService: AdminService
  ){}
    ngOnInit(): void {
        this.retrievePayments().subscribe((payments: Payment[]) => {
          this.paymentsLength = this.payments.length;
          this.totalPages = Math.ceil(this.paymentsLength / this.itemsPerPage);
        });

    }

    retrievePayments(): Observable<Payment[]> {
      return this.adminService.getAllPayment().pipe(
        tap((payments: Payment[]) => {
          this.payments = payments;
        }),
        catchError(error => {
          console.error("Error fetching users:", error);
          throw error; // Rethrow the error for the subscriber to handle
        })
      );
    }

    get currentPageItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.payments.slice(startIndex, endIndex);
    }
  
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }

}
