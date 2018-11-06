import { Component, Inject, ViewChild, ElementRef} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource } from '@angular/material';

const ELEMENT_DATA = [
  { position: 1, name: 'Water', type:"grocery store", date: "27.10.2018", location: 'Krakow' ,price:"+ 00.50 PLN" },
  { position: 2, name: 'Bread', type:"grocery store", date: "27.10.2018", location: 'Krakow' ,price:"+ 00.12 PLN" },
  { position: 3, name: 'Mars', type:"grocery store", date: "27.10.2018", location: 'Krakow' ,price:"+ 00.23 PLN" },
  { position: 4, name: 'Chocolate', type:"grocery store", date: "27.10.2018", location: 'Krakow' ,price:"+ 00.10 PLN" },
  { position: 5, name: 'Water', type:"grocery store", date: "27.10.2018", location: 'Krakow' ,price:"+ 00.70 PLN" },
  { position: 6, name: 'Soda', type:"grocery store", date: "27.10.2018", location: 'Krakow' ,price:"+ 00.13 PLN" },
  { position: 7, name: 'Meat', type:"grocery store", date: "27.10.2018", location: 'Krakow' ,price:"+ 00.03 PLN" },
  { position: 8, name: 'Chair', type:"ganiture store", date: "27.10.2018", location: 'Krakow' ,price:"+ 00.95 PLN" },
  { position: 9, name: 'Ciggaretes', type:"grocery store", date: "27.10.2018", location: 'Krakow' ,price:"+ 00.33 PLN" }
];

@Component({
  selector: 'app-money-boxes-dialog',
  templateUrl: './money-boxes-dialog.component.html',
  styleUrls: ['./money-boxes-dialog.component.css']
})

export class MoneyBoxesDialogComponent {

  displayedColumns: string[] = ['position', 'date', 'name','type', 'location', 'price'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(
    public dialogRef: MatDialogRef<MoneyBoxesDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) { }


}
