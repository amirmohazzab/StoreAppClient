import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-info',
  imports: [DecimalPipe, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss'
})
export class ProductInfo {

  @Input() product?: IProduct | null;
  @Output() toggleLike = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<void>();
  @Input() quantity = 1;
  @Output() quantityChange = new EventEmitter<number>();
}
