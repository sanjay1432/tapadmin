import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { Parent } from '../../models/parent';
import { ParentManagementService } from '../../services/parent-management.service';
import { Router,NavigationExtras } from '@angular/router';
import { ConfirmDialog } from '../import/import.component';

@Component({
  selector: 'app-parent-management',
  templateUrl: './parent-management.component.html',
  styleUrls: ['./parent-management.component.css']
})
export class ParentManagementComponent implements OnInit {

  parents: Parent[];
  displayedColumns = ['id','name','emailId','phoneNo','address', 'action'];
  dataSource;
  loader: boolean = false;
  position = 'above';
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;


  constructor(private parentManagementService: ParentManagementService,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public router: Router,public dialog: MatDialog) {
    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/edit.svg'));

    iconRegistry.addSvgIcon(
      'add',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/add.svg'));

    iconRegistry.addSvgIcon(
      'remove',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/remove.svg'));
   }
  ngOnInit() {
    this.getParent();
    this.dataSource = new MatTableDataSource<Parent>(this.parents);
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getParent(): void {
    this.loader = true;
    this.parentManagementService.get()
      .subscribe(parents => {this.parents = parents,this.loader = false,this.bindData()});
    console.log(this.parents);
  }
  bindData(): void{
    console.log(this.parents)
    this.dataSource = new MatTableDataSource<Parent>(this.parents);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onEdit(event):void{
    this.router.navigate(['/admin/parent-edit/'+event]);
  }
  onAdd():void{
    this.router.navigate(['/admin/parent-create']);
  }
  onAddstudent(pid):void{
    this.router.navigate(['/admin/student-create/'+pid]);
  }
  onRemove(event):void{
    let dialogRef = this.dialog.open(ConfirmDialog, {
      width: '20rem',
      data: { id: event,type:'remove'}
    });

    dialogRef.afterClosed().subscribe(parentId => {
      console.log('The dialog was closed');
      console.log(parentId);
      if(parentId !=true){
        this.parentManagementService.removeParent(parentId)
          .subscribe( result => {
            // Handle result
            console.log(result)
          },
          error => {
            console.log(error)
            // this.errors = error;
          });
      }
      // this.animal = result;
    });
  }
}
