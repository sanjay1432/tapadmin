import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { Course } from '../models/course';
import { CourseManagementService } from '../services/course-management.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { ConfirmDialog } from '../import/import.component';
@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  loader: boolean = false;
  courses: Course[];
  displayedColumns = ['id', 'name', 'code', 'action'];
  dataSource;
  position = 'above';
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private courseManagementService: CourseManagementService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public router: Router, public dialog: MatDialog) {
    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/edit.svg'));

    iconRegistry.addSvgIcon(
      'remove',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/remove.svg'));
  }

  ngOnInit() {
    this.getCourses();
    this.dataSource = new MatTableDataSource<Course>(this.courses);
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  getCourses(): void {
    this.loader = true;
    this.courseManagementService.get()
      .subscribe(courses => {
              console.log(courses)
        this.loader = false,
        this.courses = courses        
        this.bindData();
      });
  }

  bindData(): void{  
    this.dataSource = new MatTableDataSource<Course>(this.courses);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.courses)
  }

  onEdit(event): void {
    this.router.navigate(['/edit', { id: event,type:'updateCourse' }]);
  }
  onAdd():void{
    this.router.navigate(['/edit', {type:'newCourse'}]);
  }
  onRemove(event):void{
    let dialogRef = this.dialog.open(ConfirmDialog, {
      width: '20rem',
      data: { id: event,type:'remove'}
    });

    dialogRef.afterClosed().subscribe(code => {
      console.log('The dialog was closed');
      console.log(code);
      if(code !=true){
        this.courseManagementService.removeCourse(code)
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
