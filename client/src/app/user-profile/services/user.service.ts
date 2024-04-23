import { Injectable } from '@angular/core';
import { users } from './utilities';
import { Observable, delay, of } from 'rxjs';
import { User } from '../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000/api/user/'

  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]> {
    return of(users.users).pipe(
      delay(2000)
    )
  }

  updateUser(user: User, token: string, id: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.put<User>(this.url + id, { ...user }, httpOptions);
  }
}
