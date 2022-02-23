import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ITodo } from "../../../interfaces/ITodo";

const baseUrl = 'http://localhost:5000/api/todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  listTodos():Observable<ITodo[]>{
    return this.http.get<ITodo[]>(baseUrl)
  }

  getTodo(id:string):Observable<ITodo>{
    return this.http.get<ITodo>(baseUrl.concat('/',id))
  }

  create(todo:ITodo):Observable<any> {
    console.log("------------------")
    console.log(todo)
    return this.http.post(baseUrl,todo)
  }

  delete(id:string):Observable<any>{
    return this.http.delete(baseUrl.concat('/',id))
  }

  update(todo:ITodo):Observable<any>{
    return this.http.put(baseUrl,todo)
  }
}
