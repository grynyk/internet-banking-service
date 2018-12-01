import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { RecipientsService } from '../../services/recipients.service';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ManageItemDialogComponent } from '../dialogs/manage-item-dialog/manage-item.component';
import { FormBuilder } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
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
  displayedColumns = ['select','title'];
  constructor(private fb: FormBuilder,
    private notificationsService: NotificationsService,
    public dialog: MatDialog,private recipientsService:RecipientsService) { }

    smallScreen = false;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
      if (event.target.innerWidth < 600) {
       this.smallScreen = true;
      }
      if (event.target.innerWidth > 600) {
        this.smallScreen = false;
      }
    }

  showNotification(type,title,content,timeOut){
    let options= this.fb.group({
			type: type,
			title: title,
			content: content,
      timeOut: timeOut,
      clickIconToClose:true,
      showProgressBar:false,
			clickToClose: true,
			animate: 'scale'
    }).getRawValue();

    this.notificationsService.create(options.title, options.content,options.type,options);
  }

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
    if(this.smallScreen==true || window.innerWidth<600){
      window.scrollBy(0,600);
    }

    this.recipientAction = 'Add';
    this.accountNo = '';
    this.data = {
      title:'',
      description:'',
      account_number:'',
    }
  }

  edit(row){
    if(this.smallScreen==true || window.innerWidth<600){
      window.scrollBy(0,600);
    }
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
      width:'500px',
      data: { title: `Do you want to delete this recipient ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.recipientsService.delete(id).subscribe(res => {
          this.refresh();
          this.showNotification('success','',`Recipient has been successfully deleted`,8000);
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
        this.showNotification('success','',`Recipient has been successfully added`,8000);
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
        this.showNotification('success','',`Recipient has been successfully edited`,8000);
      });
    }

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
