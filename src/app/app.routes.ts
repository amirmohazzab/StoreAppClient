import { Routes } from '@angular/router';
import { App } from './app';
import { Shop } from './shop/shop';
import { ShopDetail } from './shop-detail/shop-detail';
import { NotFound } from './not-found/not-found';
import { Home } from './home/home';
import { ServerError } from './server-error/server-error';
import { Basket } from './basket/basket';
import { Login } from './Account/login/login';
import { Register } from './Account/register/register';
import { authGuard } from './auth-guard';
import { Checkout } from './checkout/checkout';
import { CheckoutSuccess } from './checkout-success/checkout-success';

export const routes: Routes = [
     {path: "", title: "HomePage", component: Home, data: {breadcrumb: 'Home'}},
     {path: "account/login", title: "Login", component: Login, data: {breadcrumb: 'Login'}},
     {path: "account/register", title: "Register", component: Register, data: {breadcrumb: 'Register'}},
     {path: "checkout", title: "Payment", component: Checkout, data: {breadcrumb: 'Payment'}},
     {path: "success", title: "Result Payment", component: CheckoutSuccess, data: {breadcrumb: {skip: true}}},
     {path: "shop", canActivate: [authGuard], title: "Shop", data: {breadcrumb: 'Shop'}, children: [
      { path: '', component: Shop },  // /shop
      { path: ':id', component: ShopDetail, data: {breadcrumb:{alias: 'ProductDetail'}} },
     ]},
     {path: "basket", title: "Basket", component: Basket, data: {breadcrumb: 'Basket'}},
     {path: "serverError", title: "Server Error", component: ServerError, data: {breadcrumb: 'Server Error'}},
     {path: "notFound", title: "Not Found", component: NotFound, data: {breadcrumb: '404 Error'}},
     {path: '**', title: "Not-Found", component: NotFound}
];
