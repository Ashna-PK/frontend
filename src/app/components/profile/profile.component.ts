import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isEditingProfile: boolean = false;
  userId: string | null = localStorage.getItem('userId');
  profileForm: FormGroup;

  // Default data to display
  username = 'prajwal';
  email = 'prajwal@gmail.com';
  phone = '13246567';
  address = 'trevendrum';

  constructor(private fb: FormBuilder, private userService: UserService) {
    // Initialize the form with default values
    this.profileForm = this.fb.group({
      username: [this.username, Validators.required],
      email: [this.email, [Validators.required, Validators.email]],
      phone: [this.phone, Validators.required],
      address: [this.address, Validators.required],
      password: [''] // Optional, leave empty initially
    });
  }

  ngOnInit(): void {
    this.loadUserProfile(); // Load profile data on initialization
  }

  enableProfileEdit(): void {
    this.isEditingProfile = true;
    this.profileForm.enable(); // Enable all fields for editing
  }

  onProfileSubmit(): void {
    if (this.profileForm.valid) {
      this.userService.updateUserProfile(this.userId, this.profileForm.value).subscribe({
        next: () => {
          alert('Profile updated successfully');
          this.isEditingProfile = false;
        },
        error: (error) => console.error('Failed to update profile', error)
      });
    }
  }

  cancelProfileEdit(): void {
    this.isEditingProfile = false;
    this.loadUserProfile(); // Reset form to original values
  }

  loadUserProfile(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (profile) => {
          this.profileForm.patchValue({
            username: profile.username || this.username,
            email: profile.email || this.email,
            phone: profile.phone || this.phone,
            address: profile.address || this.address,
            password: '' // Clear the password field
          });
        },
        error: (error) => console.error('Failed to load user profile', error)
      });
    } else {
      console.error('No user ID found');
    }
  }
}
