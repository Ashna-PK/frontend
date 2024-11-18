import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FormGroup, FormBuilder, Validators,  ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent {

  shopForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {
    this.shopForm = this.fb.group({
      shopName: ['', Validators.required],
      shopDescription: ['', Validators.required],
      category:['',Validators.required],
      openingTime: ['', Validators.required],
      closingTime: ['', Validators.required],
      shopAddress: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }
  // shopDetails:any={
  //   name: '',
  //   email: '',
  //   name: '',
  //   description: '',
  //   openTime: '',
  // closeTime: '',
  // category:'',
  // "address": "kochi kerala",
  // "email": "shop9@gmail.com",
  // "phoneNumber": "12346",
  // "isOpen": true,
  // "createdAt"
  // }
  onSubmit(): void {
    if (this.shopForm.valid) {
      const formData = this.shopForm.value;
      console.log('Form Submitted Successfully:', formData);
      // Implement further logic, e.g., sending data to the server.
    } else {
      console.log('Form is invalid');
    }
  }
  goToSellerHome(){this.router.navigate(['seller/home'])}
  goToLogin() {
    this.router.navigate(['/login']); // Adjust the path as needed
  }
}
