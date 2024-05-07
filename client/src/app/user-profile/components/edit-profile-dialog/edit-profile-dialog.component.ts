import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SessionService } from '../../../shared/services/session.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { User } from '../../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.scss'
})
export class EditProfileDialogComponent {
  editForm: FormGroup = new FormGroup({
    balance: new FormControl('', [
      Validators.required,
    ]),
    age: new FormControl(0, [
      Validators.required,
    ]),
    eyeColor: new FormControl('', [
      Validators.required,
    ]),
    company: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required,
    ]),
    address: new FormControl('', [
      Validators.required,
    ])
  })

  user$: Observable<User> = this.sessionService.currentUser$;
  session$: Observable<any> = this.sessionService.currentUserJwt$;

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    public dialogRef: MatDialogRef<EditProfileDialogComponent>
  ) {

  }

  update(event: Event) {
    event.preventDefault();
    let wholeUser;
     wholeUser = JSON.parse(localStorage.getItem('user')!)

    const changes: User = {
      balance: this.editForm.get('balance')?.value,
      age: this.editForm.get('age')?.value,
      eyeColor: this.editForm.get('eyeColor')?.value,
      company: this.editForm.get('company')?.value,
      email: this.editForm.get('email')?.value,
      phone: this.editForm.get('phone')?.value,
      address: this.editForm.get('address')?.value
    }

    this.session$.pipe(
      switchMap((res: any) => {
        return this.userService.updateUser(changes, res.jwt, wholeUser._id)
      })
    ).subscribe(res => {
      this.sessionService.changeCurrentUser(res)
      this.closeDialog(res)
    })

  }

  closeDialog(data: any) {
    this.dialogRef.close(data);
  }
}
