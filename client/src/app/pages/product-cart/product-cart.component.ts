import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { IProduct } from 'src/app/models/product.model';
import { CustomerService } from 'src/app/services/customer.service';
import { LoadingService } from 'src/app/services/loading.service';
import { OrderService } from 'src/app/services/order.service';
import { ICustomer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent {
  p_id: any;
  product: IProduct[] = [];
  amount: number = 1;

  customer: ICustomer[] = [];

  userLogin: boolean = false;
  showContent: boolean = false;
  confirm: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private custService: CustomerService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.loadingService.showLoading();

    setTimeout(() => {
      this.loadingService.hideLoading();
      this.showContent = true;
    }, 500);

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

  onClickAdd() {
    const add = this.amount + 1;
    if (add <= this.product[0].quantity) {
      this.amount += 1;
    }
  }

  onClickMinus() {
    const min = this.amount - 1;
    if (min > 0) {
      this.amount -= 1;
    }
  }

  onClickConfirm() {
    const token = this.authService.getToken();
    const cust_id = this.custService.getCustomerId();

    if (token === '' || cust_id === '') {
      this.router.navigateByUrl('/login');
      return;
    }

    const data = { 
      quantity: this.amount,
      id: this.product[0]._id,
    }

    this.orderService.createOrder(data, cust_id, token ?? '')
      .subscribe({
        next: () => {
          setInterval(() => {
            this.router.navigateByUrl('/product-show');
          }, 1000);

          this.confirm = true;
          this.productService.removeProductId();
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}
