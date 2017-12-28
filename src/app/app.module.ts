import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpModule } from '@angular/http';

// Import HttpClientModule from @angular/common/http
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';

import {MatExpansionModule} from '@angular/material/expansion';
import { MatSortModule } from '@angular/material';
import { MatButtonModule, MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import { StudentManagementComponent } from './student-management/student-management.component';
import { LoginComponent } from './login/login.component';

import { HttpService } from './services/http.service';
import { StudentManagementService } from './services/student-management.service';
import { CourseManagementService } from './services/course-management.service';
import { ParentManagementService } from './services/parent-management.service';
import { TeacherManagementService } from './services/teacher-management.service';

import { NavbarComponent } from './navbar/navbar.component';
import { EditComponent } from './edit/edit.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { TeacherManagementComponent } from './teacher-management/teacher-management.component';
import { ParentManagementComponent } from './parent-management/parent-management.component';
import { AttendenceChartComponent } from './attendence-chart/attendence-chart.component';
import { PerformanceChartComponent } from './performance-chart/performance-chart.component';
import { MeetingComponent } from './meeting/meeting.component';
import { ImportComponent,ConfirmDialog } from './import/import.component';
import { MessageComponent } from './message/message.component';
import { ReportComponent } from './report/report.component';
import { ArrangeMeetingComponent } from './arrange-meeting/arrange-meeting.component';





@NgModule({
  declarations: [
    AppComponent,    
    DashboardComponent,
    ConfirmDialog,
    StudentManagementComponent, LoginComponent, NavbarComponent, EditComponent, CourseManagementComponent, TeacherManagementComponent, ParentManagementComponent, AttendenceChartComponent, PerformanceChartComponent, MeetingComponent, ImportComponent, MessageComponent, ReportComponent, ArrangeMeetingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    MatProgressSpinnerModule,
    
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatSortModule,
    MatSelectModule,
    MatExpansionModule,
    MatSliderModule

  ],
   entryComponents: [
    EditComponent,AttendenceChartComponent,PerformanceChartComponent,MeetingComponent,ConfirmDialog,MessageComponent,ReportComponent
  ],
  providers: [
    HttpService,
    StudentManagementService,
    CourseManagementService,
    ParentManagementService,
    TeacherManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

