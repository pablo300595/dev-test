import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { User } from '../../models/user.model';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionUserData = (localStorage.getItem('user'));

  if(!sessionUserData) {
    router.navigate(['login']);
    return false;
  }

  const userData: User = JSON.parse(sessionUserData) || { isActive : false };
  console.log(userData)

  if (userData.isActive) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
