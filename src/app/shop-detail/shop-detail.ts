import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop-service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../models/IProduct';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-shop-detail',
  imports: [],
  templateUrl: './shop-detail.html',
  styleUrl: './shop-detail.scss'
})
export class ShopDetail implements OnInit{
  public product : IProduct;
  id: number;

  constructor(
    private shopService: ShopService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private toast: ToastrService,
    private title: Title,
    private bc: BreadcrumbService
  ){}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.shopService.getProduct(this.id).subscribe(res => {
      if (res){
        this.product = res
      this.title.setTitle(res?.title);
      this.bc.set('@ProductDetail', res?.title);
      } else {
        this.bc.set('@ProductDetail', 'Not Found');
      }
    }, 
    (error) => {
      this.bc.set('@ProductDetail', 'Not Found');
    }
  );
  }

}

