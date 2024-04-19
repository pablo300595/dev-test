import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';

export const routes: Routes = [
    { path: 'login',title:"LogIn Page", component: LoginPageComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];