import { Component, EventEmitter, OnInit, Output, OnChanges, Input } from '@angular/core';
import { IBrand } from '../models/IBrand';
import { IType } from '../models/IType';
import { ShopService } from '../services/shop-service';
import { ShopParams } from '../models/shopParams';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop-filter',
  imports: [FormsModule],
  templateUrl: './shop-filter.html',
  styleUrl: './shop-filter.scss'
})
export class ShopFilter implements OnInit{

  @Output() updateParams = new EventEmitter<boolean>();
  @Input() shopParams!: ShopParams;
  //selectedBrand: number = 0;
  //selectedType: number = 0;
  public brands: IBrand[];
  public types: IType[];
  sortOptions = [
    {key: 1, title: 'Title'},
    {key: 2, title: 'ProductType'},
    {key: 3, title: 'price'}
  ];
  sortTypeOptions = [
    {key: 1, title: 'Desc'},
    {key: 2, title: 'Asc'},
  ];


  constructor(private shopService: ShopService){}

  ngOnInit(): void {
    this.shopParams = this.shopService.getShopParams();
    this.getBrands();
    this.getTypes();
  }

   onChangeTypes(typeId: number){
    this.shopParams.typeId = Number(typeId);
    this.shopParams.pageNumber = 1;
    this.shopService.updateShopParams(this.shopParams);
    this.updateParams.emit(true);
   }

   onChangeBrands(brandId: number){
    this.shopParams.brandId = Number(brandId);
    this.shopParams.pageNumber = 1;
    this.shopService.updateShopParams(this.shopParams);
    this.updateParams.emit(true);
   }

   onChangeSort(sort: number){
    this.shopParams.sort = sort;
    this.shopService.updateShopParams(this.shopParams);
    this.updateParams.emit(true);
   }

   onChangeTypeSort(typeSort: number){
    this.shopParams.typeSort = typeSort;
    this.shopService.updateShopParams(this.shopParams);
    this.updateParams.emit(true);
   }

   private getBrands(){
    this.shopService.getBrands().subscribe(res => {
       this.brands = res;
    });
   }

   private getTypes(){
    this.shopService.getTypes().subscribe(res => {
       this.types = res;
    });
   }
}
