import { Component, Input } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { DecimalPipe } from '@angular/common';
import {RouterModule} from '@angular/router';
 
@Component({
  selector: 'app-card-shop',
  imports: [DecimalPipe, RouterModule],
  templateUrl: './card-shop.html',
  styleUrl: './card-shop.scss'
})
export class CardShop {
  @Input() product: IProduct;
}
