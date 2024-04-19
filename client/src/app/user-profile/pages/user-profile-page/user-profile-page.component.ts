import { Component } from '@angular/core';
import { ProfileGridComponent } from '../../components/profile-grid/profile-grid.component';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [ProfileGridComponent],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss'
})
export class UserProfilePageComponent {

}
