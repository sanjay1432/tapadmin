import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Student } from '../../models/student';
import { StudentManagementService } from '../../services/student-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { AttendenceChartComponent } from '../attendence-chart/attendence-chart.component';
import { PerformanceChartComponent } from '../performance-chart/performance-chart.component';
import { MeetingComponent } from '../meeting/meeting.component';
import { MessageComponent } from '../message/message.component';
import { ConfirmDialog } from '../import/import.component';
@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})

export class StudentManagementComponent implements OnInit {

  students: Student[];
  displayedColumns = ['enrollmentNo', 'parentName', 'name', 'emailId', 'dob', 'view', 'action'];
  dataSource;
  position = 'above';
  loader: boolean = false;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private studentManagementService: StudentManagementService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public router: Router, public dialog: MatDialog) {
    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/edit.svg'));

    iconRegistry.addSvgIcon(
      'attendence',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/attendence.svg'));

    iconRegistry.addSvgIcon(
      'performance',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/performance.svg'));

    iconRegistry.addSvgIcon(
      'late',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/lateness.svg'));

    iconRegistry.addSvgIcon(
      'meeting',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/meeting.svg'));

    iconRegistry.addSvgIcon(
      'message',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/message.svg'));

    iconRegistry.addSvgIcon(
      'remove',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/remove.svg'));

    iconRegistry.addSvgIcon(
      'profile',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/profile.svg'));

    iconRegistry.addSvgIcon(
      'add',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/add.svg'));
  }
  ngOnInit() {
    this.getStudents();
    this.dataSource = new MatTableDataSource<Student>(this.students);
  }


  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getStudents(): void {
    this.loader = true;
    this.studentManagementService.get()
      .subscribe(students => {
        this.students = students,
          this.loader = false,
          this.bindData();
      });
    // console.log(this.students);
  }

  bindData(): void {
    console.log(this.students)
    this.dataSource = new MatTableDataSource<Student>(this.students);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onEdit(event): void {
    this.router.navigate(['/admin/student-edit/' + event]);
  }
  onAttendence(event): void {
    let dialogRef = this.dialog.open(AttendenceChartComponent, {
      width: '80rem',
      data: { id: event }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  onPerformance(event): void {
    let dialogRef = this.dialog.open(PerformanceChartComponent, {
      width: '80rem',
      data: { id: event, type: 'performance' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  onLate(event): void {
    let dialogRef = this.dialog.open(PerformanceChartComponent, {
      width: '80rem',
      data: { id: event, type: 'lateness' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  onMeeting(event): void {
    let dialogRef = this.dialog.open(MeetingComponent, {
      width: '80rem',
      data: { id: event, type: 'stuMeet' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  onMessage(event): void {
    let dialogRef = this.dialog.open(MessageComponent, {
      width: '40rem',
      data: { id: event }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  onAdd(): void {
    this.router.navigate(['/admin/student-create']);
  }
  onAddcourse(stdId):void{
    this.router.navigate(['/admin/student-courses/'+ stdId]);
  }
  onView(id): void {
    this.router.navigate(['/admin/student-profile/' + id]);
  }
  onRemove(event): void {
    let dialogRef = this.dialog.open(ConfirmDialog, {
      width: '20rem',
      data: { id: event, type: 'remove' }
    });

    dialogRef.afterClosed().subscribe(studentId => {
      console.log('The dialog was closed');
      console.log(studentId);
      if (studentId != true) {
        this.studentManagementService.removeStudent(studentId)
          .subscribe(result => {
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


