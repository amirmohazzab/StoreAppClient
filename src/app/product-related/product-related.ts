import { Component, Input } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardShop } from '../card-shop/card-shop';

@Component({
  selector: 'app-product-related',
  imports: [CardShop],
  templateUrl: './product-related.html',
  styleUrl: './product-related.scss'
})
export class ProductRelated {

  @Input() products: IProduct[] = [];
}
