import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-complete-review-text-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-complete-review-text-modal.html',
  styleUrl: './admin-complete-review-text-modal.scss'
})
export class AdminCompleteReviewTextModal implements OnChanges{

  @Input() reviewText: string = '';
  @Input() reviewId!: number;

  editableText: string = '';
  @Output() save = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

   ngOnChanges(changes: SimpleChanges) {
    if (changes['reviewText']) {
      this.editableText = this.reviewText ?? '';
    }
  }
   
   onSave() {
     if (!this.editableText || !this.editableText.trim()) {
    return; 
  }
    this.save.emit(this.editableText.trim());
  }

  closeModal() {
    this.close.emit();
  }

  
}
