import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthGenericService } from '../shared/services/auth-generic.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';




export interface Permission {
    viewValue: string;
}


@Component({
 selector: 'admin',
 templateUrl: './admin.component.html',
 styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['displayname', 'email', 'editperm' ];
  dataSource: MatTableDataSource<any>;

 constructor( private authGenServ: AuthGenericService) {

}





permissions: Permission[] = [
    {viewValue: 'user'},
    {viewValue: 'teacher'},
    {viewValue: 'admin'}
  ];








// pulling the data from  the row attribute from material table
changePermission(data, permission) {
  console.log(data, permission);
  this.authGenServ.updateUserPerm(data, permission);
}


applyFilter(filterValue: string) {
 this.dataSource.filter = filterValue.trim().toLowerCase();


}



getAllUsers = () =>
this.authGenServ
.getAllUsers()
.subscribe(res => {
                   this.dataSource = new MatTableDataSource(res);
                   this.dataSource.sort = this.sort;
                   this.dataSource.paginator = this.paginator;
                   console.log(res);

})



ngOnInit() {this.getAllUsers(); }



}

