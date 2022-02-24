import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ITodo } from "../../../interfaces/ITodo";
import { IUser } from 'interfaces/IUser';

const baseUrl = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  listTodos():Observable<ITodo[]>{
    return this.http.get<ITodo[]>(`${baseUrl}/todos`)
  }

  getTodo(id:string):Observable<ITodo>{
    return this.http.get<ITodo>(`${baseUrl}/todos/${id}`)
  }

  create(todo:ITodo):Observable<any> {
    console.log("------------------")
    console.log(todo)
    return this.http.post(`${baseUrl}/todos`,todo)
  }

  delete(id:string):Observable<any>{
    return this.http.delete(`${baseUrl}/todos/${id}`)
  }

  update(todo:ITodo):Observable<any>{
    return this.http.put(`${baseUrl}/todos`,todo)
  }

  getUsers():Observable<IUser[]>{
    return this.http.get<IUser[]>(`${baseUrl}/users`)
  }
}
