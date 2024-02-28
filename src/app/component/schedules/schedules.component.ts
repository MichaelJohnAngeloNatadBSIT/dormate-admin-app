import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'services/admin.service';
import { DormDialogComponent } from '../../dialogs/dorm-dialog/dorm-dialog.component';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Schedule } from 'interface/schedule';
import { ScheduleDialogComponent } from 'src/app/dialogs/schedule-dialog/schedule-dialog.component';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent {
  schedules: Schedule[];
  itemsPerPage = 5; // Adjust as per your requirement
  currentPage = 1;
  totalPages : number;
  scheduleLength : number;
  //items: any[] = []; // Your data array

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
  ){

  }

  ngOnInit(): void {
    this.retrieveSchedules().subscribe((schedules: Schedule[]) => {
      this.scheduleLength = this.schedules.length;
      this.totalPages = Math.ceil(this.scheduleLength / this.itemsPerPage);
    });
  }

  retrieveSchedules(): Observable<Schedule[]> {
    return this.adminService.getAllSchedule().pipe(
      tap((schedule: Schedule[]) => {
        this.schedules = schedule;
      }),
      catchError(error => {
        console.error("Error fetching users:", error);
        throw error; // Rethrow the error for the subscriber to handle
      })
    );
  }

  openScheduleDialog(schedule:any){
    let dialogRef = this.dialog.open(ScheduleDialogComponent, { 
      width: '700px', 
      height: '80vh',
      data: schedule
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveSchedules()
     }); 
  }

  get currentPageItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.schedules.slice(startIndex, endIndex);
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
