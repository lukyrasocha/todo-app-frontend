import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos-container',
  templateUrl: './todos-container.component.html',
  styleUrls: ['./todos-container.component.css']
})
export class TodosContainerComponent implements OnInit {

  title = "Breakthrough TodoApp under Mike's supervision";
  constructor() { }

  ngOnInit(): void {
  }

}
