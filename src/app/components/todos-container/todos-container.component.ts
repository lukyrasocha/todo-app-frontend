import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import {DialogComponent} from "../dialog/dialog.component";
import {ITodo} from "../../../../interfaces/ITodo";
import {EStatuses} from "../../../../enums/Estatus";
import {TodoService} from "../../services/todo.service";
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'interfaces/IUser';
import * as moment from 'moment';


@Component({
  selector: 'app-todos-container',
  templateUrl: './todos-container.component.html',
  styleUrls: ['./todos-container.component.css']
})
export class TodosContainerComponent implements OnInit {
  currentItem = 'Television';
  todos?:ITodo[];
  title = "Breakthrough TodoApp under Mike's supervision";
  users?:IUser[];
  numberOfTodos?:number;

  constructor(private matDialog:MatDialog,private todoService: TodoService,private userService:UserService) { 
     //Get all users in the DB
     this.userService.get()
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
    this.todoService.list()
      .subscribe(
        data => {
          this.todos = data;
          this.numberOfTodos = this.todos.length
        },
        error => {
          console.log(error)
        }
      )
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

    if(result){
      if(!result.cancelled){
      result.todo.dateAdded = moment(new Date()).format("YYYY-MM-DD HH:mm:ss") 
      this.todoService.create(result.todo).subscribe()
      }
    }
    });
  }

}
