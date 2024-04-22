import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private currentUserBS = new BehaviorSubject<User>({name: {first: '', last: ''}});
  currentUser$: Observable<User> = this.currentUserBS.asObservable();

  private currentUserJwtBS = new BehaviorSubject<any>(null);
  currentUserJwt$ = this.currentUserJwtBS.asObservable();

  constructor() { }

  changeCurrentUser(currentUser: User) {
    this.currentUserBS.next(currentUser);
  }

  changeCurrentUserJwt(currentUser: {jwt: string}) {
    this.currentUserJwtBS.next(currentUser);
  }

  getCurrentUserJwt(): Observable<any> {
    return this.currentUserJwtBS;
  }
}
