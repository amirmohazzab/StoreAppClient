import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { CardShop } from '../card-shop/card-shop';
import { ShopService } from '../services/shop-service';
import { ProfileService } from '../services/profile-service';

@Component({
  selector: 'app-liked-prodcts-list',
  imports: [CardShop],
  templateUrl: './liked-prodcts-list.html',
  styleUrl: './liked-prodcts-list.scss'
})
export class LikedProdctsList implements OnInit{

  likedProducts: IProduct[] = [];
  constructor(private shopService: ShopService, private profileService: ProfileService){}

  ngOnInit(): void {
    this.loadLikedProducts();
  }

  toggleLike(product: IProduct) {
    this.shopService.toggleLike(product.id).subscribe({
      next: () => {
        // ✅ به‌روزرسانی local state بدون رفرش
        this.likedProducts = this.likedProducts.filter(p => p.id !== product.id);
      }
    });
  }

  loadLikedProducts() {
    this.profileService.getLikedProducts().subscribe(
      // { next: (res) => this.likedProducts = res }
      res => {
        this.likedProducts = res;
      console.log(this.likedProducts);
      }
  );
  }

  onLikeChanged(product: IProduct) {
  if (!product.liked) {
    // 👇 اگر محصول دیسلایک شد، از لیست حذفش کن
    this.likedProducts = this.likedProducts.filter(p => p.id !== product.id);
  }
}


}
