import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { UserProfilePageComponent } from './user-profile/pages/user-profile-page/user-profile-page.component';
import { authGuard } from './shared/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
    { path: 'login',title:"LogIn Page", component: LoginPageComponent },
    { path: 'profile', canActivate: [authGuard], title:"Profile Page", component: UserProfilePageComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent },
];