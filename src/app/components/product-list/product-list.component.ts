import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    shopId?: number;
    products: any[] = [];
    id:any;
    constructor(private route: ActivatedRoute, private http: HttpClient) {}
    
    ngOnInit(): void {
      this.initializeSeller();
    }
     bookingDetails:any={
      orderDate:'',
      totalAmount: 0 ,
      productId: 0,
      productName:'',
      price: 0,
      quantity:0,
      vendorId: 0,
      }
  
    initializeSeller(): void {
      this.route.paramMap.subscribe(params => {
         this.id = params.get('sellerId');
        console.log(this.id);
        if (this.id) {
          this.getProducts(this.id);
        } else {
          console.error('ShopId not found in route parameters.');
        }
      });
    }
    increaseQuantity(product: any): void {
      if (product.quantity > 0) {
        // Ensure selectedQuantity is initialized
        if (!product.selectedQuantity) {
          product.selectedQuantity = 0;
        }
        product.selectedQuantity++; // Increment selected quantity
        product.quantity--; // Decrease available quantity
      }
    }
    
    decreaseQuantity(product: any): void {
      if (product.selectedQuantity > 0) {
        product.selectedQuantity--; // Decrement selected quantity
        product.quantity++; // Increase available quantity
      }
    }
    // bookProduct(product: any): void {
    //   if (product.selectedQuantity > 0) {
    //     // Display an alert message
    //     alert(`Your product '${product.name}' was booked successfully!`);
    //     product.selectedQuantity = 0; // Reset selected quantity
    //   } else {
    //     alert('Please select at least one quantity to book the product.');
    //   }
    // }
    

    bookProduct(product: any): void {
      
        this.bookingDetails.userid= localStorage.getItem('userId');
        this.bookingDetails.orderDate=new Date(Date.now()).toISOString()//"2024-11-17T11:38:06.758Z";
        this.bookingDetails.totalAmount= product.price*product.selectedQuantity ;
        this.bookingDetails.productId= product.id;
        this.bookingDetails.productName=product.name;
        this.bookingDetails.price= product.price;
        this.bookingDetails.quantity=product.selectedQuantity;
        this.bookingDetails.vendorId= this.id;     
      if (product.selectedQuantity > 0) {
        console.log(product)
        this.http.post('https://localhost:7004/api/Booking',this.bookingDetails).subscribe({
          next: (res) => {
            alert(`Your ${product.selectedQuantity} '${product.name}' has been Booked successfully!`);
           console.log(res) // Reset selected quantity
          },
          error: (err) => {
            console.error('Error booking product:', err);
            alert('An error occurred while booking the product. Please try again.');
          }
        })
        const apiUrl = `https://localhost:7003/api/Product/${product.id}/${product.selectedQuantity}`;
    
        this.http.put(apiUrl, {}).subscribe({
          next: () => {
            alert(`Your ${product.selectedQuantity} '${product.name}' has been Booked successfully!`);
            product.selectedQuantity = 0; // Reset selected quantity
          },
          error: (err) => {
            console.error('Error booking product:', err);
            alert('An error occurred while booking the product. Please try again.');
          }
        });
      } else {
        alert('Please select at least one quantity to book the product.');
      }
    }
    
    
    getProducts(id:string): void {
      const apiUrl = `https://localhost:7003/api/Product/shop?shopId=${id}`;
      this.http.get<any>(apiUrl).subscribe({
        next: (res) => {
          console.log(res);
          this.products = res;
        },
        error: (err) => {
          console.error('Error fetching products:', err);
        }
      });
    }
  }