import { Component, Input } from '@angular/core';
import { ShopService } from '../services/shop-service';
import { IProduct } from '../models/IProduct';
import { ReviewForm } from '../review-form/review-form';
import { ReviewsList } from '../reviews-list/reviews-list';

@Component({
  selector: 'app-product-tabs',
  imports: [ReviewForm, ReviewsList],
  templateUrl: './product-tabs.html',
  styleUrl: './product-tabs.scss'
})
export class ProductTabs {

  @Input() product?: IProduct | null;
  activeTab: 'description'|'reviews' = 'description';
  reviews: any[] = [];

  constructor(private shopService: ShopService) {}

  ngOnInit() {
    if (this.product) this.loadReviews();
  }

  loadReviews(){
    if (!this.product) return;
    this.shopService.getReviews(this.product.id).subscribe(res => this.reviews = res);
  }

  onReviewSubmitted() {
    this.loadReviews();
    this.activeTab = 'reviews';
  }
}
