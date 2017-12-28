import { Component, OnInit , Inject} from '@angular/core';
import { StudentManagementService } from '../services/student-management.service';
import { Student } from '../models/student';
import {MatSelectChange} from '@angular/material';
import {MatDialog} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmDialog } from '../import/import.component';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  uniStudent: Student;
  color: string="warn";
  isStudent: boolean = false;
  students: Student[];
  student: MatSelectChange;
  rating: MatSelectChange;
  quarter: MatSelectChange;
  ratings=['Outstanding','Good','Requires Improvement','Inadequates'];
  quarters=['1st Quarter','2nd Quarter','3rd Quarter','4th Quarter'];
  constructor(private studentManagementService: StudentManagementService,public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getStudents();
  }
  ngDoCheck(){
    if(this.student){
      this.isStudent = true;
      console.log(this.student.value)
      let student = this.students.find(item => item.userid === this.student.value);
      this.uniStudent = student;
      //  this.inputMessgae = this.student.value;
    }
    if(this.rating){
      // this.isStudent = true;
      console.log(this.rating.value)
      //  this.inputMessgae = this.student.value;
    }
  }
  getStudents(): void {
    this.studentManagementService.get()
      .subscribe(students =>{ 
           this.students = students
      });
    // console.log(this.students);
  }
  onKey(value: string) {
    // this.values += value + ' | ';
    console.log(value)
    let student = this.students.find(item => item.enrollmentno === value || item.name === value);
       console.log(student)
       if(student!=undefined){
        this.isStudent = true;
        this.uniStudent = student;
        console.log(this.uniStudent)
       }
  }
  // pitch(event: any) {
  //   console.log(event.value);

  //     if(event.value ==2){
  //       this.color="warn";   
  //     }else if(event.value ==3){
  //       this.color="primary"; 
  //     }else if(event.value ==4){
  //       this.color="accent"; 
  //     }else if(event.value ==5){
  //       this.color="primary"; 
  //     }
  // }
  onReport():void{
    const dialogRef = this.dialog.open(ConfirmDialog, {
      height: '200px',
      width:'20rem',
      data: {type:'behavior'}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      
      console.log(`Dialog result: ${result}`);
    });
  }

}
