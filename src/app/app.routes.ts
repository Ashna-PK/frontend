
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { BakeriesComponent } from './components/bakeries/bakeries.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShopRegisterComponent } from './components/shop-register/shop-register.component';
// import { UserRegisterComponent } from './components/user-register/user-register.component';
// import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { AdminUserComponent } from './components/admin-user/admin-user.component';
import { AdminSellerComponent } from './components/admin-seller/admin-seller.component';
import { HeaderComponent } from './components/header/header.component';
import { YourOrdersComponent } from './components/your-orders/your-orders.component';

export const routes: Routes = [
            {path:'shop/register',component:ShopRegisterComponent},
            {path: 'login', component:LoginComponent},
            {path: 'profile', component:ProfileComponent},
            {path:'home', component:HomeComponent},
            {path:'', redirectTo:'home',pathMatch:'full'},
            {path:'bakeries', component:BakeriesComponent},
            { path: `product_list/:sellerId`, component: ProductListComponent },
            {path:'seller/home',component:SellerHomeComponent},
            {path:'admin/home',component:AdminHomeComponent},
            {path:'admin/user',component:AdminUserComponent},
            {path:'admin/seller',component:AdminSellerComponent},
            {path:'header',component:HeaderComponent},
            {path:'user/orders',component:YourOrdersComponent},
        // {path:'Seller_Register', component: SellerRegisterComponent},
        // {path:'User_Register', component: UserRegisterComponent},
];
