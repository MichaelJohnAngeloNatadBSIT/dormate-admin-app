import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'services/admin.service';
import { Dorm } from 'interface/dorm.model';
import { DormDialogComponent } from '../../dialogs/dorm-dialog/dorm-dialog.component';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dorms',
  templateUrl: './dorms.component.html',
  styleUrls: ['./dorms.component.css']
})
export class DormsComponent implements OnInit {
    dorms: Dorm[];
    itemsPerPage = 5; // Adjust as per your requirement
    currentPage = 1;
    totalPages : number;
    dormsLength : number;
  //items: any[] = []; // Your data array

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
  ){

  }

  ngOnInit(): void {
    this.retrieveDorms().subscribe((dorms: Dorm[]) => {
      this.dormsLength = this.dorms.length;
      this.totalPages = Math.ceil(this.dormsLength / this.itemsPerPage);
    });
  }

  retrieveDorms(): Observable<Dorm[]> {
    return this.adminService.getAllDorm().pipe(
      tap((dorms: Dorm[]) => {
        this.dorms = dorms;
      }),
      catchError(error => {
        console.error("Error fetching users:", error);
        throw error; // Rethrow the error for the subscriber to handle
      })
    );
  }

  openDormDialog(dorm:any){
    let dialogRef = this.dialog.open(DormDialogComponent, { 
      width: '700px', 
      height: '80vh',
      data: dorm
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveDorms()
     }); 
  }

  get currentPageItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.dorms.slice(startIndex, endIndex);
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
