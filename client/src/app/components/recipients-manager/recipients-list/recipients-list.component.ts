import { Component, Inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatBottomSheetRef, MatTableDataSource, MatPaginator, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { RecipientsService } from '../../../services/recipients.service';

@Component({
  selector: 'app-recipients-list',
  templateUrl: './recipients-list.component.html',
  styleUrls: ['./recipients-list.component.css']
})
export class RecipientsListComponent implements OnInit {
  displayedColumns = ['title']
  dataSource = new MatTableDataSource();

  constructor(private bottomSheetRef: MatBottomSheetRef<RecipientsListComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
      this.dataSource = new MatTableDataSource(this.data.recipients);
      this.dataSource.paginator = this.paginator;
    }
  
    SendData(row){
      this.bottomSheetRef.dismiss(row);
    }

    closeBottomSheet() {
      this.bottomSheetRef.dismiss();
    }

}
