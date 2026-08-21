import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { IReview } from '../../models/IReview';
import { IPagination } from '../../models/IPagination';
import { FilterReviewStatus, ReviewParams } from '../../models/reviewParams';
import { AdminCompleteReviewTextModal } from '../../modal/admin-complete-review-text-modal/admin-complete-review-text-modal';

@Component({
  selector: 'app-admin-product-review-list',
  imports: [DatePipe, FormsModule, PaginationModule, AdminCompleteReviewTextModal, CommonModule],
  templateUrl: './admin-product-review-list.html',
  styleUrl: './admin-product-review-list.scss'
})
export class AdminProductReviewList implements OnInit{

  public data: IPagination<IReview>
  reviewParams: ReviewParams;
  totalCount: number = 0;
  @ViewChild('text') searchItem: ElementRef;
  review: IPagination<IReview>;
  pendingCount: number = 0;
  approvedCount: number = 0;
  rejectedCount: number = 0;
  selectedReview: IReview | null = null;
  reviews: IReview[] = [];
  FilterReviewStatus = FilterReviewStatus;
  filterTimeout: any;

  constructor(public productService: ProductService){}

  ngOnInit(): void {
   this.reviewParams = this.productService.getReviewParams();
   this.loadReviews();
  }

openReviewModal(review: IReview) {
  this.selectedReview = {...review};
}

saveReview(newText: string) {
  if (!this.selectedReview) return;
  if (!newText || !newText.trim()) return;

  this.productService.updateReview(this.selectedReview.id, newText.trim()).subscribe(() => {
     this.selectedReview.comment = newText.trim();
     this.closeReviewModal();
     this.loadReviews();
  });
}

deleteReview(reviewId){
  this.productService.deleteReview(reviewId).subscribe(
    () => this.loadReviews()
  )
}

closeReviewModal() {
  this.selectedReview= null;
}

getShortText(text: string, wordLimit: number = 3): string {
  if (!text) return '';
  const words = text.split(' ');
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(' ') + ' ...'
    : text;
}

isLongText(text: string, wordLimit: number = 3): boolean {
  return text?.split(' ').length > wordLimit;
}

getReviewStatus(r: any): 'pending' | 'approved' | 'rejected' {
  if (r.isApproved === true) return 'approved';
  if (r.isApproved === false) return 'rejected';
  return 'pending';
}

loadReviews() {
   this.productService.getAdminReviews().subscribe(res => {
      this.review = res.reviews;
      this.totalCount = res.reviews.totalCount;
      this.pendingCount = res.pendingCount;
      this.approvedCount = res.approvedCount;
      this.rejectedCount = res.rejectedCount;
      console.log(this.review);
   });
}

onPageChange(data: any){
    this.reviewParams.pageNumber = data.page;
    this.productService.updateReviewParams(this.reviewParams);
    this.loadReviews();
}

// onSearch(){
//   this.reviewParams.text= this.searchItem.nativeElement.value;
//   this.loadReviews();
// }

applyFilters() {
   this.reviewParams.pageNumber = 1;
   this.loadReviews();
}

autoApplyFilters() {
  clearTimeout(this.filterTimeout);
  this.filterTimeout = setTimeout(() => {
    this.reviewParams.pageNumber = 1;
    this.loadReviews();
  }, 500);
}

onRatingChange(value: number | null){
  this.reviewParams.rating = value;
  this.reviewParams.pageNumber = 1;
  this.loadReviews();
}

onReset(){
  this.reviewParams = new ReviewParams();
  this.productService.updateReviewParams(this.reviewParams);
  this.searchItem.nativeElement.value = '';
  this.reviewParams.pageNumber = 1;
  this.loadReviews();
}

approveReview(reviewId: number) {
  this.productService.approveReview(reviewId).subscribe(() => {
    this.loadReviews(); 
  });
}

onStatusChange(value) {
  this.reviewParams.status = value;
  this.reviewParams.pageNumber = 1;
  this.productService.updateReviewParams(this.reviewParams);
  this.loadReviews();
}

rejectReview(reviewId: number) {
  this.productService.rejectReview(reviewId).subscribe(() => {
    this.loadReviews(); 
  });
}

}
