import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ITodo } from 'interfaces/ITodo';
import { IUser } from 'interfaces/IUser';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  cancelled=false
  constructor(public dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data:{emptyTodo:ITodo,users:IUser[]}) { }
  
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.cancelled=true
    this.dialogRef.close({cancelled:this.cancelled});
  }
}
