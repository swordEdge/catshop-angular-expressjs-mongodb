import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductShowComponent } from './pages/product-show/product-show.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CustomerProfileComponent } from './pages/customer-profile/customer-profile.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/product-show'},
  { path: '', pathMatch: 'full', redirectTo: '/signup'}, // test
  { path: 'product-show', component: ProductShowComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'customer-profile', component: CustomerProfileComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
