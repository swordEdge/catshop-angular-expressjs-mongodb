import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductShowComponent } from './pages/product-show/product-show.component';
import { CustomerProfileComponent } from './pages/customer-profile/customer-profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SellerSignupComponent } from './pages/seller-signup/seller-signup.component';
import { SellerProfileComponent } from './pages/seller-profile/seller-profile.component';
import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
