import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShopService } from '../services/shop-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './review-form.html',
  styleUrl: './review-form.scss'
})
export class ReviewForm {

  @Input() productId!: number | null;
  @Output() submitted = new EventEmitter<void>();
  rating = 5;
  comment = '';

  constructor(private shopService: ShopService) {}

  submit() {
    if (!this.productId) return;
    this.shopService.addReview(this.productId, { rating: this.rating, comment: this.comment }).subscribe({
      next: () => {
        this.comment = '';
        this.rating = 5;
        this.submitted.emit();
      },
      error: () => alert('Failed to submit review')
    });
  }
}
