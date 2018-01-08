import { Component, OnInit, ViewChild } from '@angular/core';
import { Parent } from '../../models/parent';
import { Student } from '../../models/student';
import { ParentManagementService } from '../../services/parent-management.service';
import { StudentManagementService } from '../../services/student-management.service';
import { Router, NavigationExtras } from '@angular/router';
import { MatSelectChange } from '@angular/material';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { ParentStudentMapping } from '../../models/parentstudentmapping';
import { ConfirmDialog } from '../import/import.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-parent-student',
  templateUrl: './parent-student.component.html',
  styleUrls: ['./parent-student.component.css']
})
export class ParentStudentComponent implements OnInit {
  valid: boolean = false;
  parentStudentIds: ParentStudentMapping[];
  selectedParent: any;
  parents: Parent[];
  allStudents: Student[] = [];
  unselectedStudents: Student[] = [];
  selectedStudents: Student[] = [];
  tobeAddIds: number[] = [];
  tobeRemoveIds: number[] = [];
  loader: boolean = false;
  parent: MatSelectChange;

  constructor(private parentManagementService: ParentManagementService, private studentManagementService: StudentManagementService, public router: Router, private httpService: HttpService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.getParent();
    this.getUnlinkedStudents();
    this.getAllStudents();
  }

  onParentSelect(id): void {
    let parent = this.parents.find(item => item.id === id);
    this.selectedParent = parent;
    this.valid = true;
    this.getParentStduents(id);
  }
  getParentStduents(id) {
    this.parentManagementService.getParentStudents(id)
      .subscribe(students => {
        console.log(students)
        // this.tobeAddIds.push(students);
        this.selectedStudents = [];
        // this.onRight();
        this.moveStudents(students, this.unselectedStudents, this.selectedStudents);

      });
  }
  onRight(): void {
    this.moveStudents(this.tobeAddIds, this.unselectedStudents, this.selectedStudents);
    this.tobeAddIds = [];
  }
  onLeft(): void {
    this.moveStudents(this.tobeRemoveIds, this.selectedStudents, this.unselectedStudents);
    this.tobeRemoveIds = [];
  }

  moveStudents(selectedStudentIds = [], source = [], destination = []): void {
    selectedStudentIds.forEach(id => {
      let student = this.allStudents.find(item => item.id === id);
      destination.unshift(student);
      let index = source.findIndex(function (item, i) {
        return item.id === id
      });
      if (index > -1) {
        source.splice(index, 1);
      }
    });
  }

  onSelect(id): void {
    this.addElement(id, this.tobeAddIds);
  }

  onRemove(id): void {
    this.addElement(id, this.tobeRemoveIds);
  }

  addElement(id, items = []) {
    var idx = items.indexOf(id);
    if (idx > -1) {
      items.splice(idx, 1);
    }
    else {
      items.push(id);
    }
  }

  getParent(): void {
    this.parentManagementService.get()
      .subscribe(parents => { this.parents = parents });
  }

  getUnlinkedStudents(): void {
    this.studentManagementService.getUnlinked()
      .subscribe(students => {
        this.loader = true;
        this.unselectedStudents = [].concat(students);
      });
  }

  getAllStudents(): void {
    this.studentManagementService.get()
      .subscribe(students => {
        this.allStudents = [].concat(students);
      });
  }

  onSave() {
    let psMapping = new ParentStudentMapping();
    this.selectedStudents.forEach(stu => {
      psMapping.studentIds.push(stu.id)
    });
    psMapping.parentId = this.selectedParent.id;
    const dialogRefs = this.dialog.open(ConfirmDialog, {
      height: '200px',
      width: '20rem',
      data: { type: 'pending' }
    });

    this.parentManagementService.saveStudent(psMapping)
      .subscribe(student => {
        if (student != undefined) {
          dialogRefs.close();
          const dialogRef = this.dialog.open(ConfirmDialog, {
            height: '200px',
            width: '20rem',
            data: { type: 'linkedParentStudent' }
          });

          dialogRef.afterClosed().subscribe(result => {

            console.log(`Dialog result: ${result}`);

            // this.course.reset();
            // Object.keys(this.course.controls).forEach(key => {
            //   this.course.controls[key].setErrors(null)
            // });
          });
        }
      });
  }
}
