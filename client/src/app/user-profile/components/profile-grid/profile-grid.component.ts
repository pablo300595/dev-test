import { Component } from '@angular/core';
import { SessionService } from '../../../shared/services/session.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-profile-grid',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './profile-grid.component.html',
  styleUrl: './profile-grid.component.scss'
})
export class ProfileGridComponent {
  user$: Observable<User> = this.sessionService.currentUser$;
  user: any = toSignal(this.user$);


  constructor(private sessionService: SessionService) {

  }


}
