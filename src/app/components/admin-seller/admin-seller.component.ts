import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ShopService } from '../../Services/shop.service';
import { delay } from 'rxjs';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-admin-seller',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './admin-seller.component.html',
  styleUrl: './admin-seller.component.css',
})
export class AdminSellerComponent implements OnInit {
  records: any[] = [];
  constructor(
    private shopService: ShopService,
    private router: Router,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    this.getShops();
  }
  deleteRecord(id: number, name: string): void {
    // Remove the record from the list
    this.shopService.deleteShop(id).subscribe({
      next: () => {
        // this.records.splice(index,1)
        this.getShops();
        alert(`shop : '${name}' was deleted successfully!`);
      },
      error: (err) => {
        console.error('Error deleting shop', err);
        alert('An error occurred while deleting the shop. Please try again.');
      },
    });
    // this.records.splice(index, 1);
  }
  validateRating(record: any): void {
    if (record.rating > 5) {
      record.rating = 5; // Restrict the value to 5 if it exceeds
    } else if (record.rating < 1) {
      record.rating = 1; // Restrict the value to 1 if it is less
    }
  }

  verifyRecord(record: any): void {
    // Update the record's verified status and rating
    if (record.rating) {
      record.isVerified = true; // Mark as verified
      this.shopService
        .verifySeller(record.id, record.rating)
        .subscribe((res: any) => {
          console.log(res);

          if (res) {
            this.records = res;
          }
        });
      console.log();
    }
  }

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  getShops() {
    this.shopService.getAllShops().subscribe((res: any) => {
      console.log(res);

      if (res) {
        this.records = res;
      }
    });
  }
}
