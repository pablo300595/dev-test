import { Component, SimpleChanges } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SessionService } from '../services/session.service';
import { AsyncPipe, JsonPipe, Location } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';


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
  cachedUser: User = {};

  currentUrl: string = '';

  constructor(private sessionService: SessionService, private location: Location, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
  }

  ngOnInit() {
    this.currentUrl = this.location.path();
    const user = JSON.parse(localStorage.getItem('user') || '');
    this.cachedUser = {...user};
    console.log('currentUrl', this.currentUrl);

    if(this.currentUrl === '/login' && user) {
      this.router.navigateByUrl('profile');
    }

    if(this.currentUrl === '/' && user) {
      this.router.navigateByUrl('profile');
    }

    if(this.currentUrl === '' && user) {
      this.router.navigateByUrl('profile');
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('');
  }
}
