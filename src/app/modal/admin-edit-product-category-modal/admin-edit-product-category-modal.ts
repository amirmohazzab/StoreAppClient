import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-product-category-modal',
  imports: [FormsModule],
  templateUrl: './admin-edit-product-category-modal.html',
  styleUrl: './admin-edit-product-category-modal.scss'
})
export class AdminEditProductCategoryModal {

  @Input() visible = false;

  @Input() model: any = {
    id: null,
    name: '',
  };

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();

  close() {
    this.visible = false;
    this.onClose.emit();
  }

  save() {
    this.onSave.emit(this.model);
  }
}
