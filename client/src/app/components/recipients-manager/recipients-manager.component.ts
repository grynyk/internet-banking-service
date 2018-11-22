import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { RecipientsService } from '../../services/recipients.service';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ManageItemDialogComponent } from '../dialogs/manage-item-dialog/manage-item.component';
@Component({
  selector: 'app-recipients-manager',
  templateUrl: './recipients-manager.component.html',
  styleUrls: ['./recipients-manager.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class RecipientsManagerComponent implements OnInit {
  public dataSource = new MatTableDataSource();
  public selection = new SelectionModel(true, []);
  displayedColumns = ['select','title','accountNumber'];
  constructor(public dialog: MatDialog,private recipientsService:RecipientsService) { }

  public selectedRow: any;
  public recipientAction = 'Manage';
  public accountNo:any;
  private recipientId:number;
  public data = {
    title:'',
    description:'',
    account_number:''
  }

  add(){
    this.recipientAction = 'Add';
    this.accountNo = '';
    this.data = {
      title:'',
      description:'',
      account_number:'',
    }
  }

  edit(row){
    this.recipientAction = 'Edit';
    this.accountNo = row.account_number;
    this.recipientId = row.id;
    this.data = {
      title:row.title,
      description:row.description,
      account_number:row.account_number,
    }
  }

  delete(id){
    const dialogRef = this.dialog.open(ManageItemDialogComponent, {
      data: { title: 'Are you sure you want to delete this item' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.recipientsService.delete(id).subscribe(res => {
          this.refresh();
        });
      }
    });
  }

  submit(type){
    this.data.account_number = this.accountNo.slice(0, 8) + "-" + this.accountNo.slice(8,12) + "-" + this.accountNo.slice(12,16) + "-" + this.accountNo.slice(16,20) + "-" + this.accountNo.slice(20,32);
    console.log(this.data);
    if(type=='add'){
      this.recipientsService.create(this.data).subscribe(res=>{
        this.data.title = '';
        this.data.description = '';
        this.data.account_number = '';
        this.accountNo = '';
        this.recipientAction = 'Manage';
        this.refresh();
      });
    }

    if(type=='edit'){
      this.recipientsService.update(this.recipientId,this.data).subscribe(res=>{
        this.data.title = '';
        this.data.description = '';
        this.data.account_number = '';
        this.accountNo = '';
        this.recipientAction = 'Manage';
        this.refresh();
      });
    }

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRowData(row) {
    this.selectedRow = row;
  }


  ngOnInit() {
    this.refresh();
  }
  refresh() {
    this.recipientsService.getAll().subscribe((res:any) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res.rows);
    });

  }

}
