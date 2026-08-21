import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProduct } from '../models/IProduct';
import { CardShop } from '../card-shop/card-shop';
import { HomeService } from '../services/home-service';
import { ProductCategoryService } from '../services/product-category-service';
import { IAdminProductCategory } from '../models/IAdminProductCategory';
import { Chat } from "../chat/chat";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, CardShop, Chat],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  categories: IAdminProductCategory[] = [];
  allProducts: IProduct[] = [];
  filteredProducts: IProduct[] = [];

  liked: IProduct[] = [];
  viewed: IProduct[] = [];

  selectedCategoryId: number | null = null;

  constructor(private homeService: HomeService, private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.productCategoryService.getAll().subscribe(res => {
      this.categories = res;
    });
    this.homeService.getFeatured().subscribe(res => {
      console.log(res);
      this.allProducts = res;
      this.filteredProducts = res;
    });
    this.homeService.getMostLiked(6).subscribe(res => {
      this.liked = res;
    });
    this.homeService.getMostViewed(6).subscribe(res => {
      this.viewed = res;
    });
  }

filterByCategory(categoryId: number) {
  this.selectedCategoryId = categoryId;

  this.filteredProducts = this.allProducts.filter(
    p => p.categoryId === categoryId
  );
}

showAllProducts() {
  this.selectedCategoryId = null;
  this.filteredProducts = this.allProducts;
}



}
