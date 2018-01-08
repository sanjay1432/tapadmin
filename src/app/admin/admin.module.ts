import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent }           from './admin.component';

import { StudentManagementComponent } from './student-management/student-management.component';
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
import { TeacherEditComponent } from './teacher-edit/teacher-edit.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { ParentEditComponent } from './parent-edit/parent-edit.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { ParentStudentComponent } from './parent-student/parent-student.component';

import { AdminRoutingModule }       from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,FormsModule, ReactiveFormsModule,MatProgressSpinnerModule,
    ChartsModule,
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
    AttendenceChartComponent,
    PerformanceChartComponent,
    MeetingComponent,
    ConfirmDialog,
    MessageComponent,
    ReportComponent
  ],
  declarations: [
    AdminComponent,
    CourseManagementComponent, 
    TeacherManagementComponent, 
    ParentManagementComponent, 
    AttendenceChartComponent, 
    PerformanceChartComponent, 
    MeetingComponent, 
    ImportComponent, 
    MessageComponent, 
    ReportComponent, 
    ArrangeMeetingComponent, 
    TeacherEditComponent,
    CourseEditComponent,
    DashboardComponent,
    ConfirmDialog,
    StudentManagementComponent, 
    StudentEditComponent,
    ParentEditComponent,
    StudentProfileComponent,
    StudentCoursesComponent,
    ParentStudentComponent
  ]
})
export class AdminModule {}