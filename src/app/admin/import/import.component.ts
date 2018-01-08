import { Component, OnInit, Inject} from '@angular/core';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  isImported: boolean = false;
  isFile: boolean =false;
  fileName: any;
  Dbcoloum = ['student_name','student_email','student_enrollmentno','student_dateofbirth','teacher_name','teacher_email','teacher_phoneno','course_name','course_code','parent_name','parent_email','parent_phoneno','parent_address'];
  Coloums = ['Student Name','Student Email','Student Enrollment Number','Student Date of Birth','Teacher Name','Teacher Email','Teacher Phone Number','Course Name','Course Code','Parent Name','Parent Email','Parent Phone Number','Parent Address','Parent Pincode','Course Name','Course Title'];

  constructor(private _location: Location,public dialog: MatDialog) { }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }
  onImport(){
    // this.router.navigate(['/import']);
    this.isImported = true;
  }
  previewImage(fileInput){
    let file = fileInput.target.files[0];
    this.fileName = file.name;
    if(this.fileName!=undefined){
      this.isFile = true;
    }
  }
  onRemove(){
    this.isFile = false;
    this.fileName = "";
  }
  onSave(){
    const dialogRef = this.dialog.open(ConfirmDialog, {
      height: '200px',
      width:'20rem',
      data: {type:'import'}
    });
  
   
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html',
})
export class ConfirmDialog {
  constructor(private _location: Location,public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any) { 
  }
  
}
