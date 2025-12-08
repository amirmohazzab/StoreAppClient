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
import { AdminLayout } from './Admin/admin-layout/admin-layout';
import { Dashboard } from './Admin/dashboard/dashboard';
import { AdminListProduct } from './Admin/admin-list-product/admin-list-product';
import { AdminCreateProduct } from './Admin/admin-create-product/admin-create-product';
import { AdminUpdateProduct } from './Admin/admin-update-product/admin-update-product';
import { AdminListUser } from './Admin/admin-list-user/admin-list-user';
import { AdminDetailUser } from './Admin/admin-detail-user/admin-detail-user';
import { AdminUpdateUser } from './Admin/admin-update-user/admin-update-user';
import { AdminGuard } from './guards/admin-guard';
import { SiteLayout } from './site-layout/site-layout';
import { PermissionGuard } from './guards/permission-guard';
import { AdminRoleList } from './Admin/admin-role-list/admin-role-list';
import { AdminRoleForm } from './Admin/admin-role-form/admin-role-form';
import { UserReviewsList } from './user-reviews-list/user-reviews-list';
import { UserAddressList } from './user-address-list/user-address-list';
import { AddressForm } from './address-form/address-form';
import { AdminListProductCategory } from './Admin/admin-list-product-category/admin-list-product-category';
import { AdminCreateProductCategory } from './Admin/admin-create-product-category/admin-create-product-category';
import { ChangePassword } from './change-password/change-password';
import { AdminListProductBrand } from './Admin/admin-list-product-brand/admin-list-product-brand';
import { AdminCreateProductBrand } from './Admin/admin-create-product-brand/admin-create-product-brand';
import { AdminListProductType } from './Admin/admin-list-product-type/admin-list-product-type';
import { AdminCreateProductType } from './Admin/admin-create-product-type/admin-create-product-type';
import { AdminDetailProduct } from './Admin/admin-detail-product/admin-detail-product';


export const routes: Routes = [
     { path: "", component: SiteLayout,
          children: [
               {path: "", title: "HomePage", component: Home, data: {breadcrumb: 'Home'}},
               {path: "account/login", title: "Login", component: Login, data: {breadcrumb: 'Login'}},
               {path: "account/register", title: "Register", component: Register, data: {breadcrumb: 'Register'}},
               {path: "checkout", canActivate: [AuthGuard], title: "Payment", component: Checkout, data: {breadcrumb: 'Payment'}},
               {path: "checkout/success", title: "Result Payment", component: CheckoutSuccess, data: {breadcrumb: {skip: true}}},
               {path: "shop", canActivate: [AuthGuard], title: "Shop", data: {breadcrumb: 'Shop'}, 
                    children: [
                    { path: '', component: Shop },  
                    { path: ':id', component: ShopDetail, data: {breadcrumb:{alias: 'ProductDetail'}} }  
               ]},
               {path: "basket", canActivate: [AuthGuard], title: "Basket", component: Basket, data: {breadcrumb: 'Basket'}},
               { path: "profile", component: ProfileLayout, 
                    children: [
                    { path: '', component: PersonalProfile, title: 'Personal Info', data: { breadcrumb: 'Personal Info', title: 'Personal Info' } },  
                    { path: 'basket', component: BasketList, title: 'My Baskets',  data: { breadcrumb: 'My Baskets', title: 'My Baskets' } },
                    { path: 'order', component: OrderList, title: 'My Orders',  data: { breadcrumb: 'My Orders', title: 'My Orders' } },
                    { path: 'like', component: LikedProdctsList, title: 'My Favorites',  data: { breadcrumb: 'My Favorites', title: 'My Favorites' } },
                    { path: 'address', component: UserAddressList, title: 'My Addresses', data: { breadcrumb: 'My Addresses' } },
                    { path: "address/create", component: AddressForm },
                    { path: "address/edit/:id", component: AddressForm },
                    { path: 'review', component: UserReviewsList, title: 'My Reviews', data: { breadcrumb: 'My Reviews' } },
                    { path: 'changePassword', component: ChangePassword, title: 'My Reviews', data: { breadcrumb: 'My Reviews' } }
               ]}
          ]},
          { path: "admin", component: AdminLayout,
          children: [
               { path: '', component: Dashboard, title: 'Dashboard', data: { breadcrumb: 'Dashboard', title: 'Dashboard' } },  
               { path: 'product', component: AdminListProduct, title: 'Product List',  data: { breadcrumb: 'Product List', title: 'Product List' } },
               { path: 'product/create', component: AdminCreateProduct, data: { breadcrumb: 'Create Product', title: 'Create Product', permission: 'Product.Create' }, title: 'Create Product'},
               { path: 'product/edit/:id', component: AdminUpdateProduct, title: 'Update Product',  data: { breadcrumb: 'Update Product', title: 'Update Product' } },
               { path: 'product/detail/:id', component: AdminDetailProduct, title: 'Detail Product',  data: { breadcrumb: 'Detail Product', title: 'Detail Product' } },
               { path: 'user', component: AdminListUser, title: 'User List', data: { breadcrumb: 'User List', title: 'User List' } },  
               { path: 'user/:id', component: AdminDetailUser, title: 'User Detail', data: { breadcrumb: 'User Detail', title: 'User Detail' } }, 
               { path: 'user/edit/:id', component: AdminUpdateUser, title: 'User Edit', data: { breadcrumb: 'User Edit', title: 'User Edit' } }, 
               { path: 'user/delete/:id', component: AdminUpdateUser, title: 'User Edit', data: { breadcrumb: 'User Edit', title: 'User Edit' } }, 
               { path: 'role', component: AdminRoleList, canActivate: [AdminGuard] },
               { path: 'role/create', component: AdminRoleForm, canActivate: [AdminGuard] },
               { path: 'role/edit/:id', component: AdminRoleForm, canActivate: [AdminGuard] },
               { path: 'category', component: AdminListProductCategory, title: 'Category List',  data: { breadcrumb: 'Category List', title: 'Category List' } },
               { path: 'category/create', component: AdminCreateProductCategory, data: { breadcrumb: 'Create Category', title: 'Create Category' }, title: 'Create Category'},
               { path: 'productBrand', component: AdminListProductBrand, title: 'Product Brand List',  data: { breadcrumb: 'Product Brand List', title: 'Product Brand List' } },
               { path: 'productBrand/create', component: AdminCreateProductBrand, data: { breadcrumb: 'Create Product Brand', title: 'Create Product Brand', permission: 'Product.Create' }, title: 'Create Product Brand'},
               { path: 'productType', component: AdminListProductType, title: 'Product Type List ',  data: { breadcrumb: 'Product Type List', title: 'Product Type List' } },
               { path: 'productType/create', component: AdminCreateProductType, data: { breadcrumb: 'Create Product Type', title: 'Create Product Type', permission: 'Product.Create' }, title: 'Create Product Type'},
          ]
     },
     {path: "serverError", title: "Server Error", component: ServerError, data: {breadcrumb: 'Server Error'}},
     {path: "notFound", title: "Not Found", component: NotFound, data: {breadcrumb: 'Not Found'}},
     {path: '**', title: "Not-Found", component: NotFound}
];


//  {path: "profile", canActivate: [AuthGuard], title: "Personal Profile", data: {breadcrumb: 'Personal Profile'}, children: [
//       { path: '', component: Profile },  
//       { path: 'basket', title: 'My Baskets', component: BasketList, data: {title: 'My Baskets', breadcrumb: 'My Baskets'} },
//      ]},
