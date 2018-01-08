import { Component, OnInit ,Inject,ViewChild} from '@angular/core';
import { ActivatedRoute, ParamMap }     from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { StudentManagementService } from '../../services/student-management.service';
import { TeacherManagementService } from '../../services/teacher-management.service';
import { Teacher } from '../../models/teacher';
import { Studentmeeting } from '../../models/studentmeeting';
import {MatSelectChange} from '@angular/material';
import * as _moment from 'moment';
import { element } from 'protractor';
// import {default as _rollupMoment} from 'moment';
const moment = _moment;

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  teachers: Teacher[];

  meetings: Studentmeeting[];
  isFilter: boolean = false;
  isRecord: boolean =true;
  panelOpenState: boolean = false;

  displayedColumns = ['id','title','sendto','date','status','isDone'];
  dataSource;
  years = [];
  months =['January','February','March','April','May','June','July','August','September','October','November','December'];
  year: MatSelectChange;
  month: MatSelectChange;
  
  @ViewChild(MatSort) sort: MatSort;
  constructor(private studentManagementService: StudentManagementService,private route: ActivatedRoute,private teacherManagementService:TeacherManagementService,@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.getTeacher();
  
    for(let i = 0;i<100;i++){
         let year = 1990+i;
         this.years.push(year)
    }


  }
  ngDoCheck(){
    if(this.year && this.month){
      this.isFilter = true;
      // new Date(x.date).getFullYear() === this.year.value && moment(new Date(x.createdAt).getMonth(), 'M').format('MMMM') === this.month.value
     let filteredRecord =  this.meetings.filter(x => new Date(x.date).getFullYear() === this.year.value && moment(new Date(x.date).getMonth()+1, 'M').format('MMMM') === this.month.value);
       console.log(filteredRecord)
       if(filteredRecord.length == 0){
         this.isRecord =false;
       }else{
        this.isRecord =true;
        this.dataSource = new MatTableDataSource<Studentmeeting>(filteredRecord);
        this.dataSource.sort = this.sort;
        // this.onRemove();
       }
    console.log(this.month.value)
    }
  }
  ngAfterViewInit() {
   
  }
  getTeacher(): void {
    this.teacherManagementService.get()
      .subscribe(teachers => {this.teachers = teachers,  this.getStudentmeetings();});
    console.log(this.teachers);
  }
  getStudentmeetings(): void {
    this.studentManagementService.getMeeting(this.data.id)
      .subscribe(meetings => {this.meetings = meetings,  
          this.meetings.forEach(element => {
              let tid = element.sendto;

              this.teachers.forEach((element1, index) => {
                if (element1.id == +tid) {
                  Object.assign(element, {
                    'sendto': element1.name
                  })
                }
              })
            }),
            this.dataSource = new MatTableDataSource<Studentmeeting>(this.meetings);
            this.dataSource.sort = this.sort;
    
    });
       
   
    console.log(this.meetings);
  }

  onYearChange(newValue) {
    console.log(newValue);
    
 }

}
