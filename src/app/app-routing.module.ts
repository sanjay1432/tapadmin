import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { TeacherManagementComponent } from './teacher-management/teacher-management.component';
import { ParentManagementComponent } from './parent-management/parent-management.component';
import { AuthGuard }                from './auth-guard.service';
import { AuthService }          from './auth.service';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';
import { AttendenceChartComponent } from './attendence-chart/attendence-chart.component';
import { ImportComponent } from './import/import.component';
import { ArrangeMeetingComponent } from './arrange-meeting/arrange-meeting.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard], },
  { path: 'student-management', component: StudentManagementComponent,canActivate: [AuthGuard]},
  { path: 'course-management', component: CourseManagementComponent,canActivate: [AuthGuard]},
  { path: 'teacher-management', component: TeacherManagementComponent,canActivate: [AuthGuard]},
  { path: 'parent-management', component: ParentManagementComponent,canActivate: [AuthGuard]},
  { path: 'attendence', component: AttendenceChartComponent,canActivate: [AuthGuard]},
  { path: 'edit', component: EditComponent,canActivate: [AuthGuard] },
  { path: 'import', component: ImportComponent,canActivate: [AuthGuard] },
  { path: 'meeting', component: ArrangeMeetingComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent}
];
 

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
  providers: [
    AuthGuard,
    AuthService
  ]
})

export class AppRoutingModule { }
