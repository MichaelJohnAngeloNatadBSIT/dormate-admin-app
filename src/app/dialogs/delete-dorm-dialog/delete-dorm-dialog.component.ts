import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'services/admin.service';

@Component({
  selector: 'app-delete-dorm-dialog',
  templateUrl: './delete-dorm-dialog.component.html',
  styleUrls: ['./delete-dorm-dialog.component.css']
})
export class DeleteDormDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    public dialog: MatDialog,
  ){}

  deleteDormPost(): void{
    this.adminService.deleteDorm(this.data).subscribe({
      next: (res) => {
        this.dialog.closeAll();
      },
      error: (e) => console.error(e)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
