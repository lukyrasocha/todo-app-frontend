import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import {DialogComponent} from "../dialog/dialog.component";
import {ITodo} from "../../../../interfaces/ITodo";
import {EStatuses} from "../../../../enums/Estatus";
import {TodoService} from "../../services/todo.service";
import { IUser } from 'interfaces/IUser';

@Component({
  selector: 'app-todos-container',
  templateUrl: './todos-container.component.html',
  styleUrls: ['./todos-container.component.css']
})
export class TodosContainerComponent implements OnInit {
  title = "Breakthrough TodoApp under Mike's supervision";
  users?:IUser[]

  constructor(private matDialog:MatDialog,private todoService: TodoService) { 
     //Get all users in the DB
     this.todoService.getUsers()
     .subscribe(
       data => {
         this.users = data;
       },
       error => {
         console.log(error)
       }
     )
  }

  ngOnInit(): void {
  }

   onOpenDialogClick(){
    const emptyTodo:ITodo = {
      title: "",
      assignee: {
        email: "",
        name: ""
      },
      assigned: {
        email: "",
        name: ""
      },
      category: 1,
      status: EStatuses.ASSIGNED,
      description: "",
      dateAdded: "",
    }

    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {todo:emptyTodo, users:this.users},
      width:"450px",
      height:"550px"
    });
    dialogRef.afterClosed().subscribe(result => {
    
     if (typeof result == 'undefined'){
       return
     }
     if (result.cancelled){
        return
      } 

      result.todo.dateAdded = new Date().toISOString().slice(0, 19).replace('T', ' ');
      this.todoService.create(result.todo).subscribe()
    });
  }

}
