import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductShowComponent } from './pages/product-show/product-show.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CustomerProfileComponent } from './pages/customer-profile/customer-profile.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';
import { SellerProfileComponent } from './pages/seller-profile/seller-profile.component';
import { SellerSignupComponent } from './pages/seller-signup/seller-signup.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductCartComponent } from './pages/product-cart/product-cart.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'product-show', component: ProductShowComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'product-cart', component: ProductCartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'customer-profile', component: CustomerProfileComponent },
  { path: 'customer-edit', component: CustomerEditComponent },
  { path: 'seller-profile', component: SellerProfileComponent },
  { path: 'seller-signup', component: SellerSignupComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
