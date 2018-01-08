import { Component, OnInit , Inject,ViewChild} from '@angular/core';
import { ActivatedRoute, ParamMap }     from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { StudentManagementService } from '../../services/student-management.service';
import { Studentlate } from '../../models/studentlate';
import { Studentmeeting } from '../../models/studentmeeting';
import {MatSelectChange} from '@angular/material';
import * as _moment from 'moment';
import { element } from 'protractor';
// import {default as _rollupMoment} from 'moment';
const moment = _moment;
@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css']
})
export class PerformanceChartComponent implements OnInit {
  meetings: Studentmeeting[];
  isFilter: boolean = false;
  isRecord: boolean =true;
  panelOpenState: boolean = false;
  latestudents: Studentlate[];
  displayedColumns = ['id','reason','time','createdAt'];
  meetingColumns =['id','title','sendTo','date','status','isDone'];
  dataSource;
  years = [];
  months =['January','February','March','April','May','June','July','August','September','October','November','December'];
  year: MatSelectChange;
  month: MatSelectChange;
  
  @ViewChild(MatSort) sort: MatSort;
  constructor(private studentManagementService: StudentManagementService,private route: ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.getLateStudents();
    this.getStudentmeetings();

    this.dataSource = new MatTableDataSource<Studentmeeting>(this.meetings);
    
    this.dataSource = new MatTableDataSource<Studentlate>(this.latestudents);
    for(let i = 0;i<100;i++){
         let year = 1990+i;
         this.years.push(year)
    }


  }
  ngDoCheck(){
    if(this.year && this.month){
      this.isFilter = true;
      // new Date(x.createdAt).getFullYear() === this.year.value && moment(new Date(x.createdAt).getMonth(), 'M').format('MMMM') === this.month.value
     let filteredRecord =  this.latestudents.filter(x => new Date(x.createdAt).getFullYear() === this.year.value && moment(new Date(x.createdAt).getMonth()+1, 'M').format('MMMM') === this.month.value);
       console.log(filteredRecord)
       if(filteredRecord.length == 0){
         this.isRecord =false;
       }else{
        this.isRecord =true;
        this.dataSource = new MatTableDataSource<Studentlate>(filteredRecord);
        this.dataSource.sort = this.sort;
        // this.onRemove();
       }
    // console.log(this.month.value)y
    }
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    
  }
  public doughnutChartLabels:string[] = ['Maths', 'Chemistry', 'Physics','Information Technology','Sports'];
  public doughnutChartData:number[] = [90, 60, 100,80,50];
  public doughnutChartType:string = 'doughnut';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  getLateStudents(): void {
    this.studentManagementService.getLate(this.data.id)
      .subscribe(latestudents => this.latestudents = latestudents);
     
    console.log(this.latestudents);
  }

  getStudentmeetings(): void {
    this.studentManagementService.getMeeting(this.data.id)
      .subscribe(meetings => this.meetings = meetings);
     
    console.log(this.meetings);
  }

  onYearChange(newValue) {
    console.log(newValue);
    
 }
//  onRemove(){
//   // this.isRecord =true;
//   // this.dataSource = new MatTableDataSource<Studentlate>(this.latestudents);
//   this.getLateStudents();
//  }
 
}
