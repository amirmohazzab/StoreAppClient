import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-gallery',
  imports: [CommonModule],
  templateUrl: './product-gallery.html',
  styleUrl: './product-gallery.scss'
})
export class ProductGallery {

  @Input() product?: IProduct | null;
  @Input() selectedImage?: string | null;
  @Output() selectedImageChange = new EventEmitter<string|null>();

  // zoom lens states
  zoomVisible = false;
  lensStyle: any = {};
  zoomBg = '';

  onThumbClick(src: string) {
    this.selectedImage = src;
    this.selectedImageChange.emit(src);
  }

  // For simple lens zoom we compute background-position from mouse
  onMouseMove(e: MouseEvent, imgEl: HTMLImageElement) {
    const rect = imgEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    this.zoomVisible = true;
    this.lensStyle = { left: `${x - 50}px`, top: `${y - 50}px` };
    this.zoomBg = `url(${this.selectedImage || this.product?.pictureUrl})`;
    this.zoomBgPosition = `${xPercent}% ${yPercent}%`;
  }
  zoomBgPosition = '50% 50%';
  onMouseLeave() { this.zoomVisible = false; }
}

