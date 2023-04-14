import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AvatarModule } from 'primeng/avatar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductShowComponent } from './pages/product-show/product-show.component';
import { CustomerProfileComponent } from './pages/customer-profile/customer-profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SellerSignupComponent } from './pages/seller-signup/seller-signup.component';
import { SellerProfileComponent } from './pages/seller-profile/seller-profile.component';
import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductCartComponent } from './pages/product-cart/product-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductShowComponent,
    CustomerProfileComponent,
    SignupComponent,
    SellerSignupComponent,
    SellerProfileComponent,
    CustomerEditComponent,
    PageNotFoundComponent,
    ProductDetailComponent,
    ProductCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastModule,
    MessagesModule,
    ChartModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    AvatarModule,
    SkeletonModule,
    ConfirmPopupModule,
    ConfirmDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
