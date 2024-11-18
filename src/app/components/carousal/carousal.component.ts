import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousal.component.html',
  styleUrl: './carousal.component.css'
})
export class CarousalComponent {
  slides = [
    { image: 'car1.jpg', title: '', description: '', alt: 'Slide 1 is not loading' },
    { image: 'car2.jpg', title: '', description: '', alt: 'Slide 2' },
    { image: 'car3.jpg', title: '', description: '', alt: 'Slide 3' },
  ];

  currentSlide = 0;

  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.slides.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === this.slides.length - 1) ? 0 : this.currentSlide + 1;
  }
}
