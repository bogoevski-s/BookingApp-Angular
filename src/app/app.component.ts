import { Component, OnInit } from '@angular/core';
import { IColumn } from './interfaces/column';
import { ResourceService } from './services/resource.service';
import { IResource } from './interfaces/resource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public tableData: IResource[] = []
  public tableColumns: IColumn[] = []
  public isTableDataLoaded: boolean = false

  constructor(private _resourceService: ResourceService) {}

  ngOnInit(): void {
    this._resourceService.getResources().subscribe((resources: IResource[]) => {
      this.tableData = resources;
      this.tableColumns = this.mapTableColumns(resources);

      if(this.tableData.length > 0){
        this.isTableDataLoaded = true;
      }
    });
  };

  mapTableColumns(tableData: IResource[]): IColumn[]{
    const columns : IColumn[] = []

    for(const key in tableData[0]){
      const header = key.charAt(0).toUpperCase() + key.substring(1)
      const column: IColumn = {
        columnDef: key,
        header: header,
        cell: (element: Record<string, any>) => `${element[key]}`
      }
      columns.push(column)
    }

    return columns;
  };
}
