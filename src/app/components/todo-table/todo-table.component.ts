import {Component, OnInit } from '@angular/core';
import { ITodo } from "../../../../interfaces/ITodo";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: 'todo-table',
  styleUrls: ['todo-table.component.css'],
  templateUrl: 'todo-table.component.html',
})
export class TodoTableComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'category', 'description','assigned','assignee','dateAdded','dateCompleted','button1','button2'];
  dataSource?:any;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.listTodos();
  }

  listTodos(): void{
    this.todoService.listTodos()
      .subscribe(
        data => {
          this.dataSource = data;
        },
        error => {
          console.log(error)
        }
      )
  }
}
