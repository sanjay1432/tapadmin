import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { Course } from '../../models/course';
import { CourseManagementService } from '../../services/course-management.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { ConfirmDialog } from '../import/import.component';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {

  loader: boolean = false;
  courses: Course[];
  displayedColumns = ['id', 'name', 'code'];
  dataSource;
 
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private courseManagementService: CourseManagementService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getCourses();
    this.dataSource = new MatTableDataSource<Course>(this.courses);
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

}
