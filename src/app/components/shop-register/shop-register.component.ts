import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
  import { Router } from '@angular/router';
  import { AuthService } from '../../Services/auth.service';
  import { FormGroup, FormBuilder, Validators,  ReactiveFormsModule } from '@angular/forms';
  import { HeaderComponent } from "../header/header.component";
import { ShopService } from '../../Services/shop.service';
@Component({
  selector: 'app-shop-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './shop-register.component.html',
  styleUrl: './shop-register.component.css'
})
export class ShopRegisterComponent implements OnInit {
    shopForm: FormGroup;
    constructor(private fb: FormBuilder,private router: Router,private shopService:ShopService) {
      this.shopForm = this.fb.group({
        shopName: ['', Validators.required],
        shopDescription: ['', Validators.required],
        category:['',Validators.required],
        openingTime: ['', Validators.required],
        closingTime: ['', Validators.required],
        shopAddress: ['', Validators.required],
        // email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        // password: ['', [Validators.required, Validators.minLength(6)]],
        // confirmPassword: ['', Validators.required],
      });
    }
    shopId=Number(localStorage.getItem("sellerId"))
    // shopDetails:any={
    //   name: '',
    //   description: '',
    //   openTime: '',
    //   closeTime: '',
    //   category:'',
    //   address: '',
    //   email: '',
    //   phoneNumber: '',
    //   isOpen: false,
    //   createdAt:Date.now(),
    // }
  shopname=localStorage.getItem('shopName')

    ngOnInit(): void {
   // Navigate after successful registration
      
      console.log(this.shopForm);
    }
    onSubmit(): void {

      if (this.shopForm.valid) {
        const shopDetails = {
          name: this.shopForm.value.shopName,
          description: this.shopForm.value.shopDescription,
          openTime: `${this.shopForm.value.openingTime}:00`,
          closeTime: `${this.shopForm.value.closingTime}:00`,
          category: this.shopForm.value.category,
          address: this.shopForm.value.shopAddress,
          email: localStorage.getItem('email'),
          phoneNumber: this.shopForm.value.phoneNumber,
          isOpen: true,
          createdAt: new Date()
        };
        localStorage.setItem('shopName',shopDetails.name);
        console.log(shopDetails);
       this.shopService.putShop(this.shopId,shopDetails).subscribe({
          next: (response) => {
            console.log('Shop registered successfully:', response);
            this.router.navigate(['seller/home']); // Navigate after successful registration
          },
          error: (error) => {
            console.error('Error registering shop:', error);
          }
        });
        this.goToSellerHome()
      } else {
        console.log('Form is invalid');
      }

    }
    goToSellerHome(){this.router.navigate(['seller/home'])}
    goToLogin() {
      this.router.navigate(['/login']); // Adjust the path as needed
    }
  }