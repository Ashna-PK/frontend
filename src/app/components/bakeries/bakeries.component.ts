import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../../Services/shop.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-bakeries',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './bakeries.component.html',
  styleUrl: './bakeries.component.css',
})
export class BakeriesComponent implements OnInit {
  bakeries: any[] = [];
  http = inject(HttpClient);

  ngOnInit(): void {
    this.getShops();
  }
  constructor(private router: Router,
    private shopService:ShopService) {}

  goToProducts(sellerId: number) {
    this.router.navigate([`/product_list/${sellerId}`]);
  }

  getShops() {
    this.shopService.getShops()   //service
    .subscribe((res: any) => {
      console.log(res);

      if (res) {
        this.bakeries = res;
      }
    });
  }
}
