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
  selector: 'app-parent-edit',
  templateUrl: './parent-edit.component.html',
  styleUrls: ['./parent-edit.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ParentEditComponent implements OnInit {

  parentId: number;
  parent: FormGroup;
  isUpdate: boolean = false;
  newParent: FormGroup;
  isSave: boolean =false;
  errors: any;
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
           this.getParent(id);
    }
    this.parentId = id;    
    this.newParent = new FormGroup({
      address : new FormControl(null, Validators.required),
      phoneNo : new FormControl(null, Validators.required),
      name : new FormControl(null, Validators.required),
      emailId :  new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      userName:new FormControl(null, Validators.required),
    });
   
  }

  getParent(id): void {
    this.parentManagementService.find(id)
      .subscribe(parent => this.bindData(parent));
  }
  bindData(parent: Parent): void {
    this.isUpdate = true;  
    this.parent = new FormGroup({
      phoneNo :new FormControl(parent.phoneNo),
      name :new FormControl(parent.name),
      emailId :new FormControl(parent.emailId),
      address :new FormControl(parent.address)
    }); 
  }
  onAddParent(event):void{
     this.isSave = true;
    let parent = event.value;
    //save the updated form
    this.parentManagementService.addParent(parent)
    .subscribe( result => {
      // Handle result
      if(result !=undefined){
        this.isSave = false;
        const dialogRef = this.dialog.open(ConfirmDialog, {
          height: '200px',
          width:'20rem',
          data: {parent:result,type:'addParent'}
        });
        
        dialogRef.afterClosed().subscribe(result => {
          
          console.log(`Dialog result: ${result}`);

          this.newParent.reset();
          Object.keys(this.newParent.controls).forEach(key => {
            this.newParent.controls[key].setErrors(null)
          });
        });
      }
    },
    error => {
      console.log(error)
      this.errors = error;
    });
  }
  onUpdateParent(event):void{
    let parent = event.value;
    parent.id = this.parentId;
    this.parentManagementService.update(parent)
      .subscribe(parent => {
        if (parent != undefined) {
          this.isSave = false;
          const dialogRef = this.dialog.open(ConfirmDialog, {
            height: '200px',
            width: '20rem',
            data: { parent: parent, type: 'updateParent' }
          });

          dialogRef.afterClosed().subscribe(result => {

            console.log(`Dialog result: ${result}`);

            this.newParent.reset();
            Object.keys(this.newParent.controls).forEach(key => {
              this.newParent.controls[key].setErrors(null)
            });
          });
        }                
      });
  }
  backClicked() {
    this._location.back();
  }

}
