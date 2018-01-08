import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { Teacher } from '../../models/teacher';
import { Parent } from '../../models/parent';
import { StudentManagementService } from '../../services/student-management.service';
import { TeacherManagementService } from '../../services/teacher-management.service';
import { ParentManagementService } from '../../services/parent-management.service';
import {MatSelectChange} from '@angular/material';
import {FormControl} from '@angular/forms';
import { FormBuilder,FormGroupDirective, NgForm, NgModel, Validators, FormGroup } from '@angular/forms';
import { ConfirmDialog } from '../import/import.component';
import {MatDialog} from '@angular/material';
@Component({
  selector: 'app-arrange-meeting',
  templateUrl: './arrange-meeting.component.html',
  styleUrls: ['./arrange-meeting.component.css']
})
export class ArrangeMeetingComponent implements OnInit {
  isTP: boolean =true;
  isSP: boolean=true;
  isST: boolean=true;
  meetingRequest: FormGroup;
  Parents: Parent[];
  Teachers: Teacher[];
  Students: Student[];
  isParentClicked: boolean = false;
  isTeacherClicked: boolean = false;
  isStudentClicked: boolean = false;
  student: MatSelectChange;
  parent: MatSelectChange;
  teacher: MatSelectChange;

  constructor(public dialog: MatDialog,private fb: FormBuilder,private studentManagementService: StudentManagementService,private teacherManagementService:TeacherManagementService,private parentManagementService:ParentManagementService) { 
    this.meetingRequest = fb.group({
      'message' : [null, Validators.required],
      'time' : [null, Validators.required],
      'date' : [null, Validators.required],
      'parent' : [null],
      'student' : [null],
      'teacher' : [null],
    });
  }

  ngOnInit() {}
  onClick(event){
          console.log(event)
    if(event == 'parent'){
      this.getParent();
      this.getTeacher();
      this.getStudents();
      this.isParentClicked = true;
      this.isTeacherClicked = false;
      this.isStudentClicked = false;
    }else if(event == 'teacher'){
      this.getParent();
      this.getTeacher();
      this.getStudents();
      this.isStudentClicked = false;
      this.isParentClicked = false;
      this.isTeacherClicked = true;
    }else if(event == 'student'){
      this.getParent();
      this.getTeacher();
      this.getStudents();
      this.isTeacherClicked = false;
      this.isParentClicked = false;
      this.isStudentClicked = true;
    }
  }
  getStudents(): void {
    this.studentManagementService.get()
      .subscribe(student => this.Students = student);
  }
  getTeacher(): void {
    this.teacherManagementService.get()
      .subscribe(teacher => this.Teachers = teacher);
  }
  getParent(): void {
    this.parentManagementService.get()
      .subscribe(parent => this.Parents = parent);
  }

  onPRequest(event):void{
     if(event.value.student == null && event.value.teacher == null){
       this.isST = false;
     }else{
     console.log(event.value)
     const dialogRef = this.dialog.open(ConfirmDialog, {
      // height: '200px',
      width:'30rem',
      data: {type:'request',value:event.value}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      
      console.log(`Dialog result: ${result}`);
    });
  }
  }
  onTRequest(event):void{
    if(event.value.student == null && event.value.parent == null){
      this.isSP = false;
    }else{
    console.log(event.value)
    const dialogRef = this.dialog.open(ConfirmDialog, {
     // height: '200px',
     width:'30rem',
     data: {type:'request',value:event.value}
   });
   
   dialogRef.afterClosed().subscribe(result => {
     
     console.log(`Dialog result: ${result}`);
   });
  }
 }
 onSRequest(event):void{
  if(event.value.teacher == null && event.value.parent == null){
    this.isTP = false;
  }else{
  console.log(event.value)
  const dialogRef = this.dialog.open(ConfirmDialog, {
   // height: '200px',
   width:'30rem',
   data: {type:'request',value:event.value}
 });
 
 dialogRef.afterClosed().subscribe(result => {
   
   console.log(`Dialog result: ${result}`);
 });
}
}
}
