import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { IUser } from 'interfaces/IUser';

const baseUrl = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get():Observable<IUser[]>{
    return this.http.get<IUser[]>(`${baseUrl}/users`)
  }
}
