import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { IReview } from '../models/IReview';
import { ProfileService } from '../services/profile-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-reviews-list',
  imports: [CommonModule],
  templateUrl: './user-reviews-list.html',
  styleUrl: './user-reviews-list.scss'
})
export class UserReviewsList {

  //   reviews = [
  //   { product: "iPhone 15", rating: 5, comment: "Amazing product!", date: "2025-01-02" },
  //   { product: "Samsung TV", rating: 4, comment: "Great image quality", date: "2024-12-10" }
  // ];
  reviews: IReview[] = [];
  loading = true;

  constructor(private profileService: ProfileService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.profileService.getUserReviews().subscribe({
      next: res => { this.reviews = res; this.loading = false; },
      error: () => { this.loading = false; Swal.fire('Error', 'Could not load reviews', 'error'); }
    });
  }

  confirmDelete(review: IReview) {
    Swal.fire({
      title: 'Delete review?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.isConfirmed) this.delete(review);
    });
  }

  delete(review: IReview) {
    this.profileService.deleteReview(review.id).subscribe({
      next: () => {
        // حذف محلی از آرایه بدون refresh
        this.reviews = this.reviews.filter(r => r.id !== review.id);
        Swal.fire('Deleted', 'Review removed', 'success');
      },
      error: () => Swal.fire('Error', 'Delete failed', 'error')
    });
  }

  getStars(): number[] { return [1,2,3,4,5]; }

  // isStarFilled(star: number, rating:number) {
  //   if (rating >= star) return 'fa-star';
  //   if (rating >= star + 0.5) return 'fa-star-half-alt';
  //   return 'far fa-star';
  // }

  isStarFilled(star: number, rating: number): 'full' | 'half' | 'empty' {
   if (rating >= star) return 'full';
   if (rating >= star - 0.5) return 'half';
   return 'empty';
  }
}
