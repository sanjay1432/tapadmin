import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroupDirective, NgForm, NgModel, Validators, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Location } from '@angular/common';
import { Student } from '../../models/student';
import { Teacher } from '../../models/teacher';
import { Parent } from '../../models/parent';
import { StudentManagementService } from '../../services/student-management.service';
import { TeacherManagementService } from '../../services/teacher-management.service';
import { ParentManagementService } from '../../services/parent-management.service';
import { CourseManagementService } from '../../services/course-management.service';
import { ConfirmDialog } from '../import/import.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import * as _moment from 'moment';
const moment = _moment;
@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class StudentEditComponent implements OnInit {
  parentId: number;
  parents: Parent;
  studentId: number;
  student: FormGroup;
  isUpdate: boolean = false;
  newStudent: FormGroup;
  isSave: boolean = false;
  errors: any;
  constructor(private _location: Location,
    private route: ActivatedRoute,
    private studentManagementService: StudentManagementService,
    private fb: FormBuilder,
    private teacherManagementService: TeacherManagementService,
    private parentManagementService: ParentManagementService,
    private courseManagementService: CourseManagementService,
    public dialog: MatDialog) { }


  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    const pId = +this.route.snapshot.paramMap.get('pid');
    this.parentId = pId;
    if (id != 0) {
      this.getStudent(id);
    }

    if (pId != 0) {
      this.getParent(pId);
    }
    this.studentId = id;
    this.newStudent = new FormGroup({
      userName: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      enrollmentNo: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      emailId: new FormControl(null, Validators.compose([Validators.required, Validators.email]))
    });
  }
  getParent(pId): void {
    this.parentManagementService.find(pId)
      .subscribe(parent => this.parents = parent);
  }

  getStudent(id): void {
    this.studentManagementService.find(id)
      .subscribe(student => this.bindData(student));
  }
  bindData(student: Student): void {
    this.isUpdate = true;
    let dob = new Date(student.dob);
    let year = dob.getFullYear();
    let month = dob.getMonth();
    let day = dob.getDate();

    this.student = new FormGroup({
      dob: new FormControl(moment([year, month, day])),
      enrollmentNo: new FormControl(student.enrollmentNo),
      name: new FormControl(student.name),
      emailId: new FormControl(student.emailId)
    });
  }
  onAddStudent(event): void {
    this.isSave = true;
    let student = event.value;
    student.parentId = this.parentId;
    //save the updated form  
    this.studentManagementService.addStudent(student)
      .subscribe(result => {
        // Handle result
        if (result != undefined) {
          this.isSave = false;
          const dialogRef = this.dialog.open(ConfirmDialog, {
            height: '200px',
            width: '20rem',
            data: { student: result, type: 'addStudent' }
          });

          dialogRef.afterClosed().subscribe(result => {

            console.log(`Dialog result: ${result}`);

            this.newStudent.reset();
            Object.keys(this.newStudent.controls).forEach(key => {
              this.newStudent.controls[key].setErrors(null)
            });
          });
        }
    },
    error => {
      console.log(error)
      this.errors = error;
    });
  }
  onUpdateStudent(event): void {
    let student = event.value;
    student.id = this.studentId;
    this.studentManagementService.update(student)
      .subscribe(student => {
        if (student != undefined) {
          this.isSave = false;
          const dialogRef = this.dialog.open(ConfirmDialog, {
            height: '200px',
            width: '20rem',
            data: { student: student, type: 'updateStudent' }
          });

          dialogRef.afterClosed().subscribe(result => {

            console.log(`Dialog result: ${result}`);

            this.newStudent.reset();
            Object.keys(this.newStudent.controls).forEach(key => {
              this.newStudent.controls[key].setErrors(null)
            });
          });
        }
      });
  }
  backClicked() {
    this._location.back();
  }
}
