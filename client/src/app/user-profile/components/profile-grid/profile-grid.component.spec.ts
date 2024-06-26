import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGridComponent } from './profile-grid.component';

describe('ProfileGridComponent', () => {
  let component: ProfileGridComponent;
  let fixture: ComponentFixture<ProfileGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
