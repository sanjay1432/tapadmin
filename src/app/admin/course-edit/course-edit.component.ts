import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroupDirective, NgForm, NgModel, Validators, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { CourseManagementService } from '../../services/course-management.service';
import { Course } from '../../models/course';
import { ConfirmDialog } from '../import/import.component';
import {MatDialog} from '@angular/material';
@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  course: FormGroup;
  selectedId: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _location: Location, private courseManagementService: CourseManagementService,public dialog: MatDialog) {
    this.course = fb.group({
      'code': [null, Validators.required],
      'name': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedId = params['id'];
    });
    this.getData();
  }


  onAdd(event): void {
    let course = event.value;
    course.id = this.selectedId;
    if (this.selectedId != undefined) {
      this.update(course);
    }
    else {
      this.save(course);
    }
  }

  save(course): void {
    this.courseManagementService.create(course)
      .subscribe(courses => {
        if(courses !=undefined){
          // this.isSave = false;
          const dialogRef = this.dialog.open(ConfirmDialog, {
            height: '200px',
            width:'20rem',
            data: {courses:courses,type:'addCourse'}
          });
          
          dialogRef.afterClosed().subscribe(result => {
            
            console.log(`Dialog result: ${result}`);
  
            this.course.reset();
            Object.keys(this.course.controls).forEach(key => {
              this.course.controls[key].setErrors(null)
            });
          });
        }
      });
  }

  update(course): void {
    this.courseManagementService.update(course)
      .subscribe(courses => {
         console.log(courses)
        if(courses !=undefined){
          // this.isSave = false;
          const dialogRef = this.dialog.open(ConfirmDialog, {
            height: '200px',
            width:'20rem',
            data: {courses:courses,type:'updateCourse'}
          });
          
          dialogRef.afterClosed().subscribe(result => {
            
            console.log(`Dialog result: ${result}`);
  
            this.course.reset();
            Object.keys(this.course.controls).forEach(key => {
              this.course.controls[key].setErrors(null)
            });
          });
        }
      });
  }

  onBack() {
    this._location.back();
  }

  getData(): void {
    this.courseManagementService.find(this.selectedId)
      .subscribe(course => {
        this.bindData(course);
      });
  }

  bindData(course: Course): void {
    this.course = new FormGroup({
      id: new FormControl(course.id),
      code: new FormControl(course.code),
      name: new FormControl(course.name)
    });
  }

}
