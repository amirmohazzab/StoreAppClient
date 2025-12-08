import { Component } from '@angular/core';
import { IReview } from '../../models/IReview';
import { ShopService } from '../../services/shop-service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-review',
  imports: [FormsModule],
  templateUrl: './edit-review.html',
  styleUrl: './edit-review.scss'
})
export class EditReview {

editModel: any = null;
currentEditingId: number | null = null;
reviews: IReview[] = [];

constructor(private shopService: ShopService, private toast: ToastrService){}

openEdit(review: IReview, modalRef: any) {
  this.editModel = { rating: review.rating, comment: review.comment };
  this.currentEditingId = review.id;
  // show modal (Bootstrap or your modal service)
}

submitEdit() {
  if (!this.currentEditingId) return;
  this.shopService.editReview(this.currentEditingId, this.editModel).subscribe(updated => {
    const idx = this.reviews.findIndex(r => r.id === this.currentEditingId);
    if (idx > -1) this.reviews[idx] = updated;
    this.toast.success('Review updated');
    this.closeModal();
  });
}

closeModal(){}
}
