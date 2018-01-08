import { Component, OnInit , Inject} from '@angular/core';
import {MatSelectChange} from '@angular/material';
import {MatDialog} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmDialog } from '../import/import.component';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  msgSend: boolean = false;
  isSend: boolean = false;
  isMessage: boolean = false;
  inputMessgae: any;
  messages = ['Work At Home','Family member is not well','Sir, I am not well today. I am Sick','Bad Weather','Stuck in traffic! What to do'];
  users = ['Parents','Teacher'];
  message: MatSelectChange;
  user: MatSelectChange;
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
   
  }
  ngDoCheck(){
    if(this.message){
      this.isMessage = true;
       this.inputMessgae = this.message.value;
    }
  }
  onSend(){
    const dialogRef = this.dialog.open(ConfirmDialog, {
      height: '200px',
      width:'20rem',
      data: {type:'message'}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      
      console.log(`Dialog result: ${result}`);
    });
    
  }

  
}
