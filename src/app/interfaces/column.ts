export interface IColumn {
  columnDef: string;
  header: string;
  cell: Function;
  isLink?: boolean;
  url?: string;
}
