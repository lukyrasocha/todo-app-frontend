import {Component, Injectable, Input, OnInit } from '@angular/core';
import { ITodo } from "../../../../interfaces/ITodo";
import { TodoService } from "../../services/todo.service";
import { MatTable } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'todo-table',
  styleUrls: ['todo-table.component.css'],
  templateUrl: 'todo-table.component.html',
})

export class TodoTableComponent implements OnInit {
  @Input() item?:ITodo[];
  @ViewChild(MatTable) myTable!: MatTable<any>;
  displayedColumns: string[] = ['title', 'status', 'category', 'description','assigned','assignee','dateAdded','dateCompleted','button1','button2'];
  dataSource?:any;
  

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.todoService.list()
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
    this.todoService.delete(id).subscribe()
    this.list();
    this.myTable.renderRows();   
  }
}
