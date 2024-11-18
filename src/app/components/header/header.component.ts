import { Component ,OnInit,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
    isLoggedIn: boolean = false;
    userRole: string | null = null;
    dropdownOpen: boolean = false;
    role:string|null=null;
    constructor() {}
    router = inject(Router);
    shopName:string|null =''
    ngOnInit(): void {
      this.role=localStorage.getItem('role');
      this.isLoggedIn = this.role?true:false; // Check if user is logged in
      this.userRole = localStorage.getItem('role'); // Fetch user's role
    this.shopName=localStorage.getItem('shopName')

    }
    email=localStorage.getItem('email')
    username=this.email ? this.email.split('@')[0] : 'Guest';
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    }
  
    goToLogin() {
      this.router.navigateByUrl('login'); 
    }
    goToOrders(){this.router.navigateByUrl('user/orders')}
    goToProfile() {
      this.router.navigateByUrl('profile'); 
    }
    goToShopOrders(){this.router.navigateByUrl('user/orders')}
      
      goToShopReview(){this.router.navigateByUrl('shop/register');}
    goToProducts(){
      this.router.navigateByUrl('seller/home');
    }

    goToAdminReview(){ this.router.navigateByUrl('admin/seller');}
    goToSellers(){this.router.navigateByUrl('admin/seller');}
    goToUsers(){this.router.navigateByUrl('admin/user');}
    logout() {
      localStorage.clear();
      window.location.reload();
    }
  }