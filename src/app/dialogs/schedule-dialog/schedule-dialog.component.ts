import { Component, Input, Inject } from '@angular/core';
import { Dorm } from 'interface/dorm.model';
import { AdminService } from 'services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SwiperOptions } from 'swiper';
import { DeleteDormDialogComponent } from '../delete-dorm-dialog/delete-dorm-dialog.component';
import { User } from 'interface/user';

@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.css']
})
export class ScheduleDialogComponent {
  scheduleForm: FormGroup;
  publishForm: FormGroup;
  unPublishForm: FormGroup;
  dorm: Dorm;
  userLandlord: User;
  userTenant: User;
  
  constructor(
    public dialogRef: MatDialogRef<ScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    private fb : FormBuilder,
    private dialog: MatDialog
  ){
    this.createForm();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getDorm();
    this.getUserLandlord();
    this.getUserTenant();
    console.log(this.data);
  }

  config: SwiperOptions = {
    pagination: { 
      el: '.swiper-pagination', 
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };

  createForm() {
    this.scheduleForm = this.fb.group({
        schedule_date: [{value:'', disabled: true}, [Validators.required, Validators.maxLength(40), Validators.minLength(5)]],
        approve_visit: [{value:'', disabled: true}, [Validators.required, Validators.maxLength(10), Validators.minLength(5)]],
        description: [{value:'', disabled: true}, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
        user_full_name: [{value:'', disabled: true}, [Validators.required, Validators.maxLength(40), Validators.minLength(1)]],
        dorm_title: [{value:'', disabled: true}, [Validators.required, Validators.maxLength(40), Validators.minLength(1)]],
    });

    this.publishForm = this.fb.group({
      publish: ['true']
    })

    this.unPublishForm = this.fb.group({
      publish: ['false']
    })

  }

  getDorm(): void {
    this.adminService.getDormById(this.data.dorm_id)
      .subscribe({
        next: (data) => {
          this.dorm = data;
        },
        error: (e) => console.error(e)
      });
  }

  getUserLandlord(): void {
    this.adminService.getUserById(this.data.landlord_id)
      .subscribe({
        next: (data) => {
          this.userLandlord =  data;
        },
        error: (e) => console.error(e)
      });
  }

  getUserTenant(): void {
    this.adminService.getUserById(this.data.tenant_user_id)
      .subscribe({
        next: (data) => {
          this.userTenant =  data;
          console.log('user: '+this.userTenant);
        },
        error: (e) => console.error(e)
      });
  }

  updateDorm(): void {
    const updateData = this.scheduleForm.getRawValue();
    this.adminService.updateDormInfo(this.data._id, updateData)
      .subscribe({
        next: (res) => {
          
        },
        error: (e) => console.error(e)
      });
  }

  publishDorm(): void{
    const updateData = this.publishForm.getRawValue();
    
    this.adminService.updateDormInfo(this.data._id, updateData)
      .subscribe({
        next: (res) => {

        },
        error: (e) => console.error(e)
      });
  }

  unPublishDorm(): void{
    const updateData = this.unPublishForm.getRawValue();
    
    this.adminService.updateDormInfo(this.data._id, updateData)
      .subscribe({
        next: (res) => {
        },
        error: (e) => console.error(e)
      });
  }

  dormDeleteDialog(dorm_id: any){
    let dialogRef = this.dialog.open(DeleteDormDialogComponent, { 
      data: dorm_id
    }); 
    // dialogRef.afterClosed().subscribe(result => { 
    //   window.location.reload();
    //  }); 

  }
}
