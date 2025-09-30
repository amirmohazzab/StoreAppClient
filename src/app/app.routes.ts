import { Routes } from '@angular/router';
import { App } from './app';
import { Shop } from './shop/shop';
import { ShopDetail } from './shop-detail/shop-detail';
import { NotFound } from './not-found/not-found';
import { Home } from './home/home';

export const routes: Routes = [
     {path: "", title: "HomePage", component: Home},
     {path: "shop", title: "Shop", component: Shop},
     {path: "shop/:id", title: "Shop-Detail", component: ShopDetail},
     {path: '**', title: "Not-Found", component: NotFound}
];
