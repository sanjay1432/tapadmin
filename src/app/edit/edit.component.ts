import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap }     from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {FormControl} from '@angular/forms';
import { FormBuilder,FormGroupDirective, NgForm, NgModel, Validators, FormGroup } from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {Location} from '@angular/common';

import { Student } from '../models/student';
import { Teacher } from '../models/teacher';
import { Parent } from '../models/parent';
import { StudentManagementService } from '../services/student-management.service';
import { TeacherManagementService } from '../services/teacher-management.service';
import { ParentManagementService } from '../services/parent-management.service';
import { CourseManagementService } from '../services/course-management.service';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// import {default as _rollupMoment} from 'moment';
const moment = _moment;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class EditComponent implements OnInit {
  course: FormGroup;
  singleCourse: any;
  newCourse: FormGroup;
  parent: FormGroup;
  singleParent: Parent;
  newParent: FormGroup;
  teacher: FormGroup;
  singleTeacher: any;
  newTeacher: FormGroup;
  newStudent: any;
  newuser: FormGroup;
  errors: any;
  user: any;
  title: string;
  type: any;
  email: FormControl;
  name: FormControl;
  enrollno: FormControl;
  date: any;
  singleStudents: Student;
  selectedId: number;

  constructor(private route: ActivatedRoute,private _location: Location,private studentManagementService: StudentManagementService,
    private fb: FormBuilder,private teacherManagementService:TeacherManagementService,private parentManagementService:ParentManagementService,private courseManagementService:CourseManagementService) {
    this.newStudent = fb.group({
      'date' : [null, Validators.required],
      'enrollno' : [null, Validators.required],
      'name' : [null, Validators.required],
      'email' : [null, Validators.compose([Validators.required, Validators.email])],
    });
    this.newTeacher = fb.group({
      // 'Uname' : [null, Validators.required],
      'phoneNo' : [null, Validators.required],
      'name' : [null, Validators.required],
      'emailId' : [null, Validators.compose([Validators.required, Validators.email])],
    });
    this.newParent = fb.group({
      'address' : [null, Validators.required],
      'phoneno' : [null, Validators.required],
      'name' : [null, Validators.required],
      'email' : [null, Validators.compose([Validators.required, Validators.email])],
    });
    this.newCourse = fb.group({
      'code' : [null, Validators.required],
      'name' : [null, Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
     this.selectedId = params['id'];
     this.type = params['type'];
    });

    if(this.type == 'student'){
      this.title = 'Update Student Profile';
    }else if(this.type == 'newStudent'){
      this.title = 'Add New Student';
    }else if(this.type == 'newTeacher'){
      this.title = 'Add New Teacher';
    }else if(this.type == 'updateTeacher'){
      this.title = 'Update Teacher Profile';
    }else if(this.type == 'newParent'){
      this.title = 'Add New Parent';
    }else if(this.type == 'updateParent'){
      this.title = 'Update Parent Profile';
    }else if(this.type == 'newCourse'){
      this.title = 'Add New Course';
    }else if(this.type == 'updateCourse'){
      this.title = 'Update Course';
    }
     
    this.getStudents();
    this.getTeacher();
    this.getParent();
    this.getCourse();
   if(this.singleStudents){
    let dob = new Date(this.singleStudents.dateofbirth);
    let year = dob.getFullYear();
    let month = dob.getMonth();
    let day =dob.getDate();
   
    this.user = new FormGroup({
        date :new FormControl(moment([year,month,day])),
        enrollno :new FormControl(this.singleStudents.enrollmentno),
        name :new FormControl(this.singleStudents.name),
        email :new FormControl(this.singleStudents.email)
    }); 
   }
   if(this.singleTeacher){
      this.teacher = new FormGroup({
        phoneno :new FormControl(this.singleTeacher.phoneno),
        name :new FormControl(this.singleTeacher.name),
        email :new FormControl(this.singleTeacher.email)
    }); 
   }

   if(this.singleParent){
      this.parent = new FormGroup({
        phoneno :new FormControl(this.singleParent.phoneno),
        name :new FormControl(this.singleParent.name),
        email :new FormControl(this.singleParent.email),
        address :new FormControl(this.singleParent.address)
    }); 
   }
   if(this.singleCourse){
        this.course = new FormGroup({
          code :new FormControl(this.singleCourse.code),
          name :new FormControl(this.singleCourse.name)
      }); 
    }
  }
  getStudents(): void {
    this.studentManagementService.getOne(this.selectedId)
      .subscribe(student => this.singleStudents = student);
  }
  getTeacher(): void {
    this.teacherManagementService.getOne(this.selectedId)
      .subscribe(teacher => this.singleTeacher = teacher);
  }
  getParent(): void {
    this.parentManagementService.getOne(this.selectedId)
      .subscribe(parent => this.singleParent = parent);
  }
  getCourse(): void {
    this.courseManagementService.getOne(this.selectedId)
      .subscribe(course => this.singleCourse = course);
  }
  backClicked() {
    this._location.back();
  }
  onUpdate(event):void{
         event.value['userid'] = this.selectedId;
     let student = event.value;
    //save the updated form

    this.studentManagementService.updateStudent(student)
    .subscribe( result => {
      // Handle result
      console.log(result)
    },
    error => {
      console.log(error)
      this.errors = error;
    });

  }

  onAdd(event):void{
    console.log(event.value)
    let student = event.value;
    //save the updated form

    this.studentManagementService.addStudent(student)
    .subscribe( result => {
      // Handle result
      console.log(result)
    },
    error => {
      console.log(error)
      this.errors = error;
    });
  }

  onAddTeacher(event):void{
    console.log(event.value)

    let teacher = event.value;
    //save the updated form

    this.teacherManagementService.addTeacher(teacher)
    .subscribe( result => {
      // Handle result
      // console.log(result)
    },
    error => {
      console.log(error)
      this.errors = error;
    });
  }
  onUpdateTeacher(event):void{
      event.value['userid'] = this.selectedId;
  let student = event.value;
  //save the updated form

  this.teacherManagementService.updateTeacher(student)
  .subscribe( result => {
  // Handle result
  console.log(result)
  },
  error => {
  console.log(error)
  this.errors = error;
  });

  }


}
