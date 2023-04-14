import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';
import { AuthService } from 'src/app/services/auth.service';
import { IProduct } from 'src/app/models/product.model';
import { ISeller } from 'src/app/models/seller.model';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent {
  p_id: any;
  product: IProduct[] = [];
  amount: number = 1;

  constructor(
    private router: Router,
    private productService: ProductService,
    private sellerService: SellerService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private custService: CustomerService,
    private orderService: OrderService
  ) {
    this.p_id = this.activeRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.loadData();
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

    console.log(data)

    this.orderService.createOrder(data, cust_id, token ?? '')
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/product-show');
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}
