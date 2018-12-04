import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AdminPanelService } from '../../admin-panel.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['select','created_date', 'name', 'email','manage'];
  dataSource = new MatTableDataSource();
  
  goToProfile(row){
    this.router.navigate(['admin-panel/users/',row.id]);
  }
  goToTransactions(row){
    this.router.navigate(['admin-panel/transactions/',row.id]);
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public selection = new SelectionModel(true, []);

  constructor(private router:Router,
    private service: AdminPanelService) {
  }

  ngOnInit() {

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
  selectedRow:any;
  getRowData(row) {
    this.selectedRow = row;
  }


}
