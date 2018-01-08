import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { Teacher } from '../../models/teacher';
import { TeacherManagementService } from '../../services/teacher-management.service';
import { Router,NavigationExtras } from '@angular/router';
import { ConfirmDialog } from '../import/import.component';
import { ReportComponent } from '../report/report.component';
@Component({
  selector: 'app-teacher-management',
  templateUrl: './teacher-management.component.html',
  styleUrls: ['./teacher-management.component.css']
})
export class TeacherManagementComponent implements OnInit {
  loader: boolean = false;

  
  teachers: Teacher[];
  displayedColumns = ['id', 'userName','name','emailId','phoneNo','report','action'];
  dataSource;
  position = 'above';
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;


  constructor(private teacherManagementService: TeacherManagementService,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public router: Router,public dialog: MatDialog) {
    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/edit.svg'));

      iconRegistry.addSvgIcon(
        'behavior',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/behavior.svg'));

    iconRegistry.addSvgIcon(
      'remove',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/remove.svg'));
   }
  ngOnInit() {
    this.getTeacher();
    this.dataSource = new MatTableDataSource<Teacher>(this.teachers);
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTeacher(): void {
    this.loader = true;
    this.teacherManagementService.get()
      .subscribe(teachers => {this.teachers = teachers,this.loader = false, this.bindData();});
    console.log(this.teachers);
  }
  bindData(): void{  
    this.dataSource = new MatTableDataSource<Teacher>(this.teachers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.teachers)
  }
  onEdit(event):void{
    this.router.navigate(['/admin/teacher-edit/'+event]);
  }
  onAdd():void{
    this.router.navigate(['/admin/teacher-create']);
  }
  onRemove(event):void{
    let dialogRef = this.dialog.open(ConfirmDialog, {
      width: '20rem',
      data: { id: event,type:'remove'}
    });

    dialogRef.afterClosed().subscribe(teacherId => {
      console.log('The dialog was closed');
      console.log(teacherId);
      if(teacherId !=true){
        this.teacherManagementService.removeTeacher(teacherId)
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
  onBehavior(event):void{
    let dialogRef = this.dialog.open(ReportComponent, {
      width: '40rem',
      data: { id: event,type:'behavior'}
    });

    dialogRef.afterClosed().subscribe(teacherId => {
      console.log('The dialog was closed');
      console.log(teacherId);
      // if(teacherId !=true){
      //   this.teacherManagementService.removeTeacher(teacherId)
      //     .subscribe( result => {
      //       // Handle result
      //       console.log(result)
      //     },
      //     error => {
      //       console.log(error)
      //       // this.errors = error;
      //     });
      // }
      // this.animal = result;
    });
  }

}
