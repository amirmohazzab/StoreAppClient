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
 
@Component({
  selector: 'app-card-shop',
  imports: [ RouterModule, FormsModule, CommonModule],
  templateUrl: './card-shop.html',
  styleUrl: './card-shop.scss'
})
export class CardShop implements OnInit {

   likedProducts: IProduct[];

   @Input() product!: IProduct;
   @Input() showLikesCount: boolean = true;
   @Input() showVisitsCount: boolean = true;
   @Input() likeCount: number = 0;
   @Input() viewCount: number = 0;

   @Output() likedChanged = new EventEmitter<IProduct>();
    
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
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product).subscribe();
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
    return `https://localhost:7096/images/products/${pictureUrl}`;
  }
  return pictureUrl;
}

// getLikeStatus(){
//    if (this.product?.id) {
//     this.shopService.getLikeStatus(this.product.id).subscribe(res => {
//       this.product.liked = res.liked;
//       this.cd.detectChanges();
//     });
//   }
// }

}
