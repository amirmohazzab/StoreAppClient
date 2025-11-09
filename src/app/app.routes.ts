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
import { AuthGuard } from './guards/auth-guard';
import { Checkout } from './checkout/checkout';
import { CheckoutSuccess } from './checkout-success/checkout-success';
import { BasketList } from './basket-list/basket-list';
import { PersonalProfile } from './personal-profile/personal-profile';
import { ProfileLayout } from './profile-layout/profile-layout';
import { OrderList } from './order-list/order-list';
import { LikedProdctsList } from './liked-prodcts-list/liked-prodcts-list';


export const routes: Routes = [
     {path: "", title: "HomePage", component: Home, data: {breadcrumb: 'Home'}},
     {path: "account/login", title: "Login", component: Login, data: {breadcrumb: 'Login'}},
     {path: "account/register", title: "Register", component: Register, data: {breadcrumb: 'Register'}},
     {path: "checkout", canActivate: [AuthGuard], title: "Payment", component: Checkout, data: {breadcrumb: 'Payment'}},
     {path: "checkout/success", title: "Result Payment", component: CheckoutSuccess, data: {breadcrumb: {skip: true}}},
     {path: "shop", canActivate: [AuthGuard], title: "Shop", data: {breadcrumb: 'Shop'}, children: [
      { path: '', component: Shop },  
      { path: ':id', component: ShopDetail, data: {breadcrumb:{alias: 'ProductDetail'}} },
     ]},
     {path: "basket", title: "Basket", component: Basket, data: {breadcrumb: 'Basket'}},
     { path: "profile", component: ProfileLayout, children: [
          { path: '', component: PersonalProfile, title: 'Personal Info', data: { breadcrumb: 'Personal Info', title: 'Personal Info' } },  
          { path: 'basket', component: BasketList, title: 'My Baskets',  data: { breadcrumb: 'My Baskets', title: 'My Baskets' } },
          { path: 'order', component: OrderList, title: 'My Orders',  data: { breadcrumb: 'My Orders', title: 'My Orders' } },
          { path: 'like', component: LikedProdctsList, title: 'My Favorites',  data: { breadcrumb: 'My Favorites', title: 'My Favorites' } }
     ]},
     {path: "serverError", title: "Server Error", component: ServerError, data: {breadcrumb: 'Server Error'}},
     {path: "notFound", title: "Not Found", component: NotFound, data: {breadcrumb: 'Not Found'}},
     {path: '**', title: "Not-Found", component: NotFound}
];


//  {path: "profile", canActivate: [AuthGuard], title: "Personal Profile", data: {breadcrumb: 'Personal Profile'}, children: [
//       { path: '', component: Profile },  
//       { path: 'basket', title: 'My Baskets', component: BasketList, data: {title: 'My Baskets', breadcrumb: 'My Baskets'} },
//      ]},
