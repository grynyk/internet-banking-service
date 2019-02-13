import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AdminPanelService } from '../../admin-panel.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { User } from '../../../shared/models/User';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['select','created_date', 'name', 'email','manage'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public selection = new SelectionModel(true, []);

  constructor(private router:Router,
    private dialog:MatDialog,
    private service: AdminPanelService) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.service.getAllUsers().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.rows);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addUser(){
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '650px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.createUser(result).subscribe((res:any) => {
          this.refresh();
        })
      }
      });
  }

  selectedRow:any;
  getRowData(user: User) {
    this.selectedRow = user;
  }

  goToProfile(user: User){
    this.router.navigate(['admin-panel/users/', user.id]);
  }
  
  goToTransactions(user: User){
    this.router.navigate(['admin-panel/transactions/',user.id]);
  }

}
