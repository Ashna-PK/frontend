import { Component ,TemplateRef, ViewChild} from '@angular/core';
import { CommonModule, LocationChangeListener } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../Services/booking.service';
import { HeaderComponent } from "../header/header.component";
import { ReviewService } from '../../Services/review.service';

@Component({
  selector: 'app-your-orders',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent],
  templateUrl: './your-orders.component.html',
  styleUrl: './your-orders.component.css'
})
export class YourOrdersComponent {
  reviewdetails:any={
  bookingId:0,
  productId: 0,
  shopid: 0,
  userid: 0,
  dateTime: new Date(Date.now()).toISOString(),
  message:'',
  userRating:0
  }
  role: any=localStorage.getItem('role')
  orders: any[] = [];
  reviewText = '';
  rating: number | null = null; // Store the rating
  showReviewModal = false;
  selectedOrder: any = null;

  constructor(private bookingService:BookingService,private reviewService:ReviewService) {
    this.loadOrders();
  }

  loadOrders() {
     if (this.role === 'user') {
     this.bookingService.getBookingsOfUser(localStorage.getItem('userId')).subscribe({
      next: (res) => {
        this.orders=res;
        alert('orders retrieved succesfuly');
        console.log(res);
      },
      error: (err) => {
        console.error('Error loading orders', err);
        alert(
          'An error occurred while loading the orders. Please try again.'
        );
      },
     })
     } else if (this.role === 'seller') {
      this.bookingService.getBookingsOfShop(localStorage.getItem('sellerId')).subscribe({
        next: (res) => {
          this.orders=res;
          alert('orders retrieved succesfuly');
          console.log(res);
        },
        error: (err) => {
          console.error('Error loading orders', err);
          alert(
            'An error occurred while loading the orders. Please try again.'
          );
        },
       })
  }
}

  openReviewModal(order: any) {
    this.showReviewModal = true;
    this.selectedOrder = order;
    this.reviewText = '';
    this.rating = null; // Reset the rating
  }

  closeReviewModal() {
    this.showReviewModal = false;
    this.selectedOrder = null;
  }
  
  
  
  submitReview() {
    if (this.reviewText.trim() === '') {
      alert('Review text cannot be empty.');
      return;
    }
    if (!this.rating) {
      alert('Please select a rating.');
      return;
    }
    this.reviewdetails.bookingId=0;
    this.reviewdetails.productId=0;
    this.reviewdetails.shopid= 0;
    this.reviewdetails.userid=0;
    this.reviewdetails.dateTime= new Date(Date.now()).toISOString();
    this.reviewdetails.message='';
    this.reviewdetails.userRating=0;
    this.reviewService.postReview()
    console.log('Review Submitted for:', this.selectedOrder, 'with text:', this.reviewText, 'and rating:', this.rating);
    
    this.closeReviewModal();
  }
}
