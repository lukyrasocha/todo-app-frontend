import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import {DialogComponent} from "../dialog/dialog.component";
import {ITodo} from "../../../../interfaces/ITodo";
import {EStatuses} from "../../../../enums/Estatus";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-todos-container',
  templateUrl: './todos-container.component.html',
  styleUrls: ['./todos-container.component.css']
})
export class TodosContainerComponent implements OnInit {
  title = "Breakthrough TodoApp under Mike's supervision";
  constructor(private matDialog:MatDialog,private todoService: TodoService) { }

  ngOnInit(): void {
  }

  onOpenDialogClick(){
    const todo:ITodo = {
      title: "",
      assignee: {
        email: "robert@gmail.com",
        name: "Robert Spralja"
      },
      assigned: {
        email: "lukas@gmail.com",
        name: "Lukas Rasocha"
      },
      category: 1,
      status: EStatuses.ASSIGNED,
      description: "",
      dateAdded: "2022-02-11 17:46:26",
      dateCompleted: null
    }

    const dialogRef = this.matDialog.open(DialogComponent, {
      data: todo,
      width:"250px",
      height:"350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.cancelled){
        return
      }
      console.log('The dialog was closed');
      console.log(result)
      
      result.dateAdded = new Date().toISOString().slice(0, 19).replace('T', ' ');
      this.todoService.create(result).subscribe()
    });
  }

}
