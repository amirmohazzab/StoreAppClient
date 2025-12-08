import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-product-type-modal',
  imports: [FormsModule],
  templateUrl: './admin-edit-product-type-modal.html',
  styleUrl: './admin-edit-product-type-modal.scss'
})
export class AdminEditProductTypeModal {

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

