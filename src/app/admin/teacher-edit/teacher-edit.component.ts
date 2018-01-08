import { Component, OnInit } from '@angular/core';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {FormControl} from '@angular/forms';
import { FormBuilder,FormGroupDirective, NgForm, NgModel, Validators, FormGroup } from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {Location} from '@angular/common';
import { Student } from '../../models/student';
import { Teacher } from '../../models/teacher';
import { Parent } from '../../models/parent';
import { StudentManagementService } from '../../services/student-management.service';
import { TeacherManagementService } from '../../services/teacher-management.service';
import { ParentManagementService } from '../../services/parent-management.service';
import { CourseManagementService } from '../../services/course-management.service';
import { ConfirmDialog } from '../import/import.component';
import {MatDialog} from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import * as _moment from 'moment';
const moment = _moment;
@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class TeacherEditComponent implements OnInit {
  teacher: FormGroup;
  isUpdate: boolean = false;
  teacherId: number;
  isSave: boolean =false;
  errors: any;
  newTeacher: FormGroup;
  constructor(private _location: Location,
              private route: ActivatedRoute,
              private studentManagementService: StudentManagementService,
              private fb: FormBuilder,
              private teacherManagementService:TeacherManagementService,
              private parentManagementService:ParentManagementService,
              private courseManagementService:CourseManagementService,
              public dialog: MatDialog)
              {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if(id != 0){   
           this.getTeacher(id);
    }
    this.teacherId = id;
    this.newTeacher = new FormGroup({
      userName: new FormControl(null, Validators.required),
      phoneNo : new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      emailId: new FormControl(null, Validators.compose([Validators.required, Validators.email]))  
    });
   
  }
  getTeacher(id): void {
    this.teacherManagementService.find(id)
      .subscribe(teacher => this.bindData(teacher));
  }
  bindData(teacher: Teacher): void {
    this.isUpdate = true;
    this.teacher = new FormGroup({
      name: new FormControl(teacher.name),
      phoneNo :new FormControl(teacher.phoneNo),
      emailId :new FormControl(teacher.emailId)
    });
  }
  onAddTeacher(event):void{
     this.isSave = true;
    let teacher = event.value;
    //save the updated form  
    this.teacherManagementService.addTeacher(teacher)
    .subscribe( result => {
      // Handle result
      if(result !=undefined){
        this.isSave = false;
        const dialogRef = this.dialog.open(ConfirmDialog, {
          height: '200px',
          width:'20rem',
          data: {teacher:result,type:'addTeacher'}
        });
        
        dialogRef.afterClosed().subscribe(result => {
          
          console.log(`Dialog result: ${result}`);

          this.newTeacher.reset();
                                                                                                                                                                                                                                                                  
        });
      }
    },
    error => {
      console.log(error)
      this.errors = error;
    });
  }
  onUpdateTeacher(event):void{
    let teacher = event.value;
    teacher.id = this.teacherId;
    this.teacherManagementService.update(teacher)
      .subscribe(teacher => {
        if (teacher != undefined) {
          this.isSave = false;
          const dialogRef = this.dialog.open(ConfirmDialog, {
            height: '200px',
            width: '20rem',
            data: { teacher: teacher, type: 'updateTeacher' }
          });

          dialogRef.afterClosed().subscribe(result => {

            console.log(`Dialog result: ${result}`);

            this.newTeacher.reset();
            Object.keys(this.newTeacher.controls).forEach(key => {
              this.newTeacher.controls[key].setErrors(null)
            });
          });
        }        
      });
  }
  backClicked() {
    this._location.back();
  }
}
