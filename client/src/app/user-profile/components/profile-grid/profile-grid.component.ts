import { Component } from '@angular/core';
import { SessionService } from '../../../shared/services/session.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { AsyncPipe, JsonPipe } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'app-profile-grid',
  standalone: true,
  imports: [
    AsyncPipe, 
    JsonPipe,
    MatDialogModule
  ],
  templateUrl: './profile-grid.component.html',
  styleUrl: './profile-grid.component.scss'
})
export class ProfileGridComponent {
  user$: Observable<User> = this.sessionService.currentUser$;
  user: any = toSignal(this.user$);


  constructor(
    private sessionService: SessionService,
    public dialog: MatDialog
  ) {

  }

  openDialog() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      height: '60vh',
      width: '50vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



}
