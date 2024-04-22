import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SessionService } from '../services/session.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    AsyncPipe,
    JsonPipe
  ],
  // providers: [ SessionService ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showFiller = false;
  user$: Observable<User> = this.sessionService.currentUser$;
  users: any;

  constructor(private sessionService: SessionService) {}

}
