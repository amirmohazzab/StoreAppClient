import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { BasketService } from '../services/basket-service';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../services/shop-service';
import { ProfileService } from '../services/profile-service';
import { environment } from '../../environments/environment';
 
@Component({
  selector: 'app-card-shop',
  imports: [ RouterModule, FormsModule, CommonModule],
  templateUrl: './card-shop.html',
  styleUrl: './card-shop.scss'
})
export class CardShop implements OnInit {

   likedProducts: IProduct[];
   products: IProduct[];

   @Input() product!: IProduct;
   @Input() showLikesCount: boolean = true;
   @Input() showVisitsCount: boolean = true;
   @Input() likeCount: number = 0;
   @Input() viewCount: number = 0;

   @Output() likedChanged = new EventEmitter<IProduct>();
   isAddedToCart = false;
   
    
   constructor(
    private basketService: BasketService, 
    private shopService: ShopService, 
    private profileService: ProfileService, 
    private toast: ToastrService, 
    private cd: ChangeDetectorRef){}

  ngOnInit(): void {
    this.likedProducts = [];
    //this.loadLikedProducts();
    this.profileService.likedProducts$.subscribe(res => this.likedProducts = res);
    //this.getLikeStatus();
    this.basketService.basketItems$.subscribe(basket => {
      this.isAddedToCart = basket?.items?.some(x => x.productId === this.product?.id) ?? false;
    });
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product)
     .subscribe({
      next: () => {
        this.toast.success('Product added to basket');
      },
      error: err => {
        console.error(err);
        this.toast.error('Failed to add product to basket');
      }
    });
  }


  loadLikedProducts() {
    this.profileService.getLikedProducts().subscribe({
      next: (res) => this.likedProducts = [...res]
    });
  }

toggleLike(product: IProduct) {
  this.shopService.toggleLike(product.id).subscribe({
    next: (res) => {
      product.liked = res.liked;
      product.likeCount = res.likeCount;
      
      if (res.liked) this.toast.success('Product added to favorites ❤️');
      else this.toast.info('Product deleted from favorites 💔');

      this.likedChanged.emit(product);
    },
    error: () => this.toast.error('Operation Error')
  });
}


  getImageUrl(pictureUrl: string | null | undefined): string {
     
    if (!pictureUrl.startsWith('http')) {
      return `${environment.imageBaseUrl}${pictureUrl}`;
    }
    return pictureUrl;
  }

//  getImageUrl(pictureUrl: string | null | undefined): string {

//    if (!pictureUrl) return 'assets/no-image.png';

//    if (pictureUrl.startsWith('http')) return pictureUrl;

//    return `${environment.imageBaseUrl}${pictureUrl}`;
//  }

// getImageUrl(pictureUrl: string | null | undefined): string {

//   console.log("IMAGE PATH:", pictureUrl);

//   return "https://storeapp.ahmohazab.com/images/products/test.jpg";
// }



}
