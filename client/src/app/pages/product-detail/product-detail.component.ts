import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';
import { AuthService } from 'src/app/services/auth.service';
import { IProduct } from 'src/app/models/product.model';
import { CustomerService } from 'src/app/services/customer.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ICustomer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  p_id: any;
  product: IProduct[] = [];
  customer: ICustomer[] = [];

  userLogin: boolean = false;
  showContent: boolean = false;
  showToLogin: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private custService: CustomerService,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {

  }
  
  ngOnInit(): void {
    this.loadingService.showLoading();

    setTimeout(() => {
      this.loadingService.hideLoading();
      this.showContent = true;
    }, 1000);

    this.p_id = this.productService.getProductId();
    this.loadData();
    this.loadCustomer();
  }

  ngOnDestroy() {
    this.loadingService.hideLoading();
    window.location.reload();
  }

  loadData() {
    this.productService.getProductById(this.p_id)
      .subscribe({
        next: ({ data }) => {
          this.product = [data];
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  loadCustomer() {
    const token = this.authService.getToken();
    const cust_id = this.custService.getCustomerId();

    if (token === '' || cust_id === '') return;

    this.custService.getCustomerById(cust_id, token ?? '')
      .subscribe({
        next: ({ data }) => {
          this.customer = [data];
          this.userLogin = true;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  onClickCart() {
    const token = this.authService.getToken();

    if (token === '') {
      setInterval(() => {
        this.router.navigateByUrl('/login');
      }, 1500);

      this.showToLogin = true;
    } else {
      this.router.navigateByUrl('/product-cart');
    }
  }

  onClickBack() {
    this.router.navigateByUrl('/product-show');
  }
}
