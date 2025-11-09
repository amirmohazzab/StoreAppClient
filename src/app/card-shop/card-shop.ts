import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { CommonModule, DecimalPipe } from '@angular/common';
import {RouterModule} from '@angular/router';
import { BasketService } from '../services/basket-service';
import { ProfileService } from '../services/profile-service';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
 
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
   @Input() likesCount: number = 0;
   @Input() visitsCount: number = 0;

   @Output() likedChanged = new EventEmitter<IProduct>();
    
   constructor(
    private basketService: BasketService, 
    private profileService: ProfileService, 
    private toast: ToastrService, 
    private cd: ChangeDetectorRef){}

  ngOnInit(): void {
    this.likedProducts = [];
    //this.loadLikedProducts();
    this.profileService.likedProducts$.subscribe(res => this.likedProducts = res);
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
  this.profileService.toggleLike(product.id).subscribe({
    next: (response) => {
      const liked = response?.liked; 
      product.liked = liked;
      if (liked) this.toast.success('Product added to favorites ❤️');
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

}
