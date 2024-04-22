import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRes } from '../../../models/login-res.model';
import { SessionService } from '../../../shared/services/session.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  // providers: [AuthService, SessionService],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss'
})
export class LoginCardComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10)
    ])
  })

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


  login(event: Event) {
    event.preventDefault();

    const subscription = this.authService.login(
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value
    ).subscribe({
      next: (response: LoginRes) => {
        if(response.existingUser?.isActive === false) {
          // alert('This user is inactive')
          this.openSnackBar('This user is inactive', '');
          setTimeout(() => {
            this._snackBar.dismiss();
          }, 4000);
          throw new Error('This user is inactive');
        } else {
          this.sessionService.changeCurrentUserJwt(response.session);
          this.sessionService.changeCurrentUser(response.existingUser || {});
          localStorage.setItem('jwt', response.session['jwt'])
          localStorage.setItem('user', JSON.stringify(response.existingUser));
        }

      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        this.router.navigate(['/profile']);
      },
    })

  }
}
