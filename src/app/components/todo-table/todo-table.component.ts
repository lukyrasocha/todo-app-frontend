import {Component, Injectable, OnInit } from '@angular/core';
import { ITodo } from "../../../../interfaces/ITodo";
import { TodoService } from "../../services/todo.service";
//import { MatTable } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'todo-table',
  styleUrls: ['todo-table.component.css'],
  templateUrl: 'todo-table.component.html',
})

export class TodoTableComponent implements OnInit {
  @ViewChild(MatTable) myTable!: MatTable<any>;
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

  
  deleteTodoClick(id:string):void{
    console.log(id)
    //alert("Successfully deleted")
    this.todoService.delete(id).subscribe()
    this.listTodos();
    console.log(this.myTable)
    this.myTable.renderRows();   

  }

  update():void{
    this.listTodos()
    console.log(this.myTable)
    this.myTable.renderRows()
  }
}
