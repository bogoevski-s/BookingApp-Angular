import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { MaterialModule } from './static/material.module';
import { BookingModalComponent } from './components/booking-modal/booking-modal.component';
import { NotificationModalComponent } from './components/notification-modal/notification-modal.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, TableComponent, BookingModalComponent, NotificationModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
