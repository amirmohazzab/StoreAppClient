import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProduct } from '../models/IProduct';
import { CardShop } from '../card-shop/card-shop';
import { HomeService } from '../services/home-service';
import { ProductCategoryService } from '../services/product-category-service';
import { IAdminProductCategory } from '../models/IAdminProductCategory';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, CardShop],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  categories: IAdminProductCategory[] = [];
  allProducts: IProduct[] = [];
  liked: IProduct[] = [];
  viewed: IProduct[] = [];

  constructor(private homeService: HomeService, private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.productCategoryService.getAll().subscribe(res => {
      this.categories = res;
    });
    this.homeService.getFeatured().subscribe(res => {
      this.allProducts = res;
    });
    this.homeService.getMostLiked(6).subscribe(res => {
      this.liked = res;
    });
    this.homeService.getMostViewed(6).subscribe(res => {
      this.viewed = res;
    });
  }

//   loadProducts(categoryId?: number, brandId?: number, search?: string) {
//   this.homeService.getFeatured({ categoryId, brandId, search }).subscribe({
//     next: (res) => this.allProducts = res,
//     error: (err) => console.error('Error loading products:', err)
//   });
// }



}
