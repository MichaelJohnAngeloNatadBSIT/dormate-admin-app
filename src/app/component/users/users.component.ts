import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'services/admin.service';
import { User } from 'interface/user';
import { UserDialogComponent } from '../../dialogs/user-dialog/user-dialog.component';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  itemsPerPage = 5; // Adjust as per your requirement
  currentPage = 1;
  totalPages: number;
  usersLength: number;
  //items: any[] = []; // Your data array

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
  ){

  }

  ngOnInit(): void {
        this.retrieveUsers().subscribe((users: User[]) => {
          this.usersLength = this.users.length;
          this.totalPages = Math.ceil(this.usersLength / this.itemsPerPage);
        });
  }

  retrieveUsers(): Observable<User[]> {
    return this.adminService.getAllUser().pipe(
      tap((users: User[]) => {
        this.users = users;
      }),
      catchError(error => {
        console.error("Error fetching users:", error);
        throw error; // Rethrow the error for the subscriber to handle
      })
    );
  }

  openUserDialog(user: User): void {
    let dialogRef = this.dialog.open(UserDialogComponent, { 
      width: '700px', 
      height: '80vh',
      data: user
    }); 
    dialogRef.afterClosed().subscribe(result => { 
      this.retrieveUsers()
     }); 
  }

  get currentPageItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
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
