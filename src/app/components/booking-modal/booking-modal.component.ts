import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ResourceService } from 'src/app/services/resource.service';
import { IBookingRequest } from 'src/app/interfaces/resource';
import * as moment from 'moment';
import { ErrorMessages } from 'src/app/static/error-messages';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent implements OnInit {

  bookingForm!: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<BookingModalComponent>, 
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    private _resourceService: ResourceService,
    @Inject(MAT_DIALOG_DATA) public resourceId: number
  ) {}

  ngOnInit(): void {
    this.bookingForm = this._fb.group({
      dateFrom: '',
      dateTo: '',
      quantity: ''
    });
  };
  bookDialogClose(): void {
    this._dialogRef.close();
  };

  openNotificationModal(message: string): void{
    this._dialog.open(NotificationModalComponent, {
      width: '450px',
      data: message
    });
  };

  bookResource(): void{
    var dateFrom = moment(this.bookingForm.value.dateFrom, "MM-DD-YYYY").utc(this.bookingForm.value.dateFrom).toISOString();
    var dateTo = moment(this.bookingForm.value.dateTo, "MM-DD-YYYY").utc(this.bookingForm.value.dateTo).toISOString();

    const request: IBookingRequest = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      requestedQuantity: this.bookingForm.value.quantity,
      resourceId: this.resourceId
    };

    if(!this.bookingForm.valid){
      this.openNotificationModal("Please enter valid input");
    }
    else{
      this._resourceService.bookResource(request).subscribe((response) => {
        this.openNotificationModal("Successfully booked");
        this.bookDialogClose();
      },
      (err) => {
        this.showErrorMessage(err.error);
      });
    }
  };

  showErrorMessage(error: string){
    ErrorMessages.forEach(message => {
      if(error.includes(message)){
        this.openNotificationModal(message);
      }
    });
  }
}
