import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { UserProfilePageComponent } from './user-profile/pages/user-profile-page/user-profile-page.component';

export const routes: Routes = [
    { path: 'login',title:"LogIn Page", component: LoginPageComponent },
    { path: 'profile',title:"Profile Page", component: UserProfilePageComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];