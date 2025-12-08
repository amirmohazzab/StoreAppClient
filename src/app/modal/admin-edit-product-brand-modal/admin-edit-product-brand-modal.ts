import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-product-brand-modal',
  imports: [FormsModule],
  templateUrl: './admin-edit-product-brand-modal.html',
  styleUrl: './admin-edit-product-brand-modal.scss'
})
export class AdminEditProductBrandModal {

  @Input() visible = false;
  
    @Input() model: any = {
      id: null,
      title: '',
      description: '',
      summary: ''
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
