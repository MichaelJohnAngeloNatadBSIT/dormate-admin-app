import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'services/admin.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    public dialog: MatDialog
  ){}
  
  deleteUser(){
    this.adminService.deleteUser(this.data).subscribe({
      next: (res) => {
        this.dialog.closeAll();
      },
      error: (e) => console.error(e)
    });;

  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
