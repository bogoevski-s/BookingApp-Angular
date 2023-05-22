import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IColumn } from '../../interfaces/column';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';
import { IResource } from '../../interfaces/resource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() tableColumns: IColumn[] = [];
  @Input() tableData: IResource[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<IResource> = new MatTableDataSource();

  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {
    this.displayedColumns = [
      ...this.tableColumns.map((c) => c.columnDef),
      'actions',
    ];
    this.dataSource = new MatTableDataSource(this.tableData);
  };

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

  openDialog(resourceId: number): void {
    const dialogRef = this._dialog.open(BookingModalComponent, {
      data: resourceId,
    });
  };
}
