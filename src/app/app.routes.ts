import { Routes } from '@angular/router';
import { App } from './app';
import { Shop } from './shop/shop';
import { ShopDetail } from './shop-detail/shop-detail';
import { NotFound } from './not-found/not-found';
import { Home } from './home/home';
import { ServerError } from './server-error/server-error';
import { Basket } from './basket/basket';

export const routes: Routes = [
     {path: "", title: "HomePage", component: Home, data: {breadcrumb: 'Home'}},
     {path: "shop", title: "Shop", data: {breadcrumb: 'Shop'}, children: [
      { path: '', component: Shop },  // /shop
      { path: ':id', component: ShopDetail, data: {breadcrumb:{alias: 'ProductDetail'}} },
     ]},
     {path: "basket", title: "Basket", component: Basket, data: {breadcrumb: 'Basket'}},
     {path: "serverError", title: "Server Error", component: ServerError, data: {breadcrumb: 'Server Error'}},
     {path: "notFound", title: "Not Found", component: NotFound, data: {breadcrumb: '404 Error'}},
     {path: '**', title: "Not-Found", component: NotFound}
];
