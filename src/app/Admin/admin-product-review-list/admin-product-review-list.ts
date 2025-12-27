import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { IReview } from '../../models/IReview';
import { IPagination } from '../../models/IPagination';
import { ReviewParams } from '../../models/reviewParams';
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
  reviews: IReview[];

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

getShortText(text: string, wordLimit: number = 5): string {
  if (!text) return '';
  const words = text.split(' ');
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(' ') + ' ...'
    : text;
}

isLongText(text: string, wordLimit: number = 5): boolean {
  return text?.split(' ').length > wordLimit;
}

loadReviews() {
   this.productService.getAdminReviews().subscribe(res => {
      this.review = res.reviews;
      this.totalCount = this.review.totalCount;
      this.pendingCount = res.pendingCount;
      this.approvedCount = res.approvedCount;
      this.rejectedCount = res.rejectedCount;
      console.log(res);
   });
}

onPageChange(data: any){
    this.reviewParams.pageNumber = data.page;
    this.productService.updateReviewParams(this.reviewParams);
    this.loadReviews();
}

  constructor(private productService: ProductService){}

  ngOnInit(): void {
   this.loadReviews();
   this.reviewParams = this.productService.getReviewParams();
   this.reviewParams.rating = null;
   this.reviewParams.isApproved = undefined;
  }

  onSearch(){
    this.reviewParams.text= this.searchItem.nativeElement.value;
    this.loadReviews();
  }

applyFilters(value: boolean | null | undefined) {
  this.reviewParams.isApproved = value;
  this.loadReviews();
}

  onReset(){
    this.reviewParams = new ReviewParams();
    this.productService.updateReviewParams(this.reviewParams);
    this.searchItem.nativeElement.value = '';
    this.reviewParams.rating = null;
    this.reviewParams.isApproved = null;
    this.loadReviews();
  }

   approveReview(reviewId: number) {
     this.productService.approveReview(reviewId, true).subscribe(() => {
       //this.reviewParams.status = 'All';
       this.loadReviews(); 
     });
   }

//   approveReview(reviewId: number) {
//   this.productService.approveReview(reviewId, true).subscribe({
//     next: () => {

//       // اگر فیلتر روی Pending است → از لیست حذف شود
//       if (this.reviewParams.status === 'Pending') {
//         this.data.result = this.data.result.filter(r => r.id !== reviewId);
//         this.data.totalCount--;
//       }

//       // اگر All یا Approved است → فقط وضعیت را آپدیت کن
//       else {
//         const review = this.data.result.find(r => r.id === reviewId);
//         if (review) {
//           review.isApproved = true;
//         }
//       }
//     },
//      error: () => {
//        this.toastr.error('Approve failed');
//      }
//   });
// }


  rejectReview(reviewId: number) {
    this.productService.approveReview(reviewId, false).subscribe(() => {
      this.loadReviews(); 
    });
  }

}
