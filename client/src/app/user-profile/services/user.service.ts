import { Injectable } from '@angular/core';
import { users } from './utilities';
import { Observable, delay, of } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers():Observable<User[]> {
    return of(users.users).pipe(
      delay(2000)
    )
  }
}
