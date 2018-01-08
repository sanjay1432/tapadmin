import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent }           from './admin.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { TeacherManagementComponent } from './teacher-management/teacher-management.component';
import { ParentManagementComponent } from './parent-management/parent-management.component';
import { AuthGuard }                from '../auth-guard.service';
import { AuthService }          from '../auth.service';
import { AttendenceChartComponent } from './attendence-chart/attendence-chart.component';
import { ImportComponent } from './import/import.component';
import { ArrangeMeetingComponent } from './arrange-meeting/arrange-meeting.component';
import { TeacherEditComponent } from './teacher-edit/teacher-edit.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { ParentEditComponent } from './parent-edit/parent-edit.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { ParentStudentComponent } from './parent-student/parent-student.component';
const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard], },
          { path: 'student-management', component: StudentManagementComponent,canActivate: [AuthGuard]},
          { path: 'course-management', component: CourseManagementComponent,canActivate: [AuthGuard]},
          { path: 'course-edit/:id', component: CourseEditComponent,canActivate: [AuthGuard] },
          { path: 'course-create', component: CourseEditComponent,canActivate: [AuthGuard] },
          { path: 'teacher-management', component: TeacherManagementComponent,canActivate: [AuthGuard]},
          { path: 'parent-management', component: ParentManagementComponent,canActivate: [AuthGuard]},
          { path: 'attendence', component: AttendenceChartComponent,canActivate: [AuthGuard]},  
          { path: 'import', component: ImportComponent,canActivate: [AuthGuard] },
          { path: 'meeting', component: ArrangeMeetingComponent,canActivate: [AuthGuard] },
          { path: 'teacher-create', component: TeacherEditComponent,canActivate: [AuthGuard] },
          { path: 'student-create/:pid', component: StudentEditComponent,canActivate: [AuthGuard] },
          { path: 'parent-create', component: ParentEditComponent,canActivate: [AuthGuard] },
          { path: 'teacher-edit/:id', component: TeacherEditComponent,canActivate: [AuthGuard] },
          { path: 'student-edit/:id', component: StudentEditComponent,canActivate: [AuthGuard] },
          { path: 'parent-edit/:id', component: ParentEditComponent,canActivate: [AuthGuard] },
          { path: 'student-profile/:id', component: StudentProfileComponent,canActivate: [AuthGuard] },
          { path: 'student-courses/:id', component: StudentCoursesComponent,canActivate: [AuthGuard] },
          { path: 'parent-student', component: ParentStudentComponent,canActivate: [AuthGuard] },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
