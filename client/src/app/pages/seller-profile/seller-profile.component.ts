import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { SellerService } from 'src/app/services/seller.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { ISeller } from 'src/app/models/seller.model';
import { LoadingService } from 'src/app/services/loading.service';
import { MessageService } from 'primeng/api';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css'],
  providers: [MessageService]
})
export class SellerProfileComponent {
  seller: ISeller[] = [];
  products: IProduct[] = [];

  showAdd: boolean = false;
  showContent: boolean = false;
  data: any;
  options: any;

  constructor(
    private router: Router,
    private custService: CustomerService,
    private sellService: SellerService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private prodService: ProductService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.loadingService.showLoading();

    // setTimeout(() => {
    //   this.loadingService.hideLoading();
    //   this.showContent = true;
    // }, 1500);
    setTimeout(() => {
      this.loadingService.hideLoading();
      this.showContent = true;
    }, 2000);

    this.LoadSellerData();
    this.loadVisualization();
    this.loadProductData();
  }

  ngOnDestroy() {
    this.loadingService.hideLoading();
  }

  LoadSellerData() {
    const token = this.authService.getToken();
    const cust_id = this.custService.getCustomerId();

    if (token === '' || cust_id === '') {
      this.router.navigateByUrl('/login');
      return;
    }

    this.sellService.getSellerByCustomerId(
      cust_id,
      token ?? ''
    ).subscribe({
      next: (data) => {
        this.seller.push(...data.data);

        this.sellService.setSellerId(this.seller[0]._id);
      },
      error: (err) => {
        console.log(err);
        // Unauthorization
        if (err === 'Unauthorized.') {
          this.router.navigateByUrl('/login');
        } else {
          // NO SELLER ACCOUNT OR SOMETHING WENT WRONG
          this.router.navigateByUrl('/seller-signup');
        }
      }
    })
  }

  loadProductData() {
    const token = this.authService.getToken();
    const sell_id = this.sellService.getSellerId();

    if (token === '' || sell_id === '') {
      this.router.navigateByUrl('/login');
      return;
    }

    this.prodService.getProductsBySellerId(sell_id, token ?? '')
      .subscribe({
        next: ({ data }) => {
          if (data.length > 0) {
            this.products.push(data);
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  loadOrderData() {
    
  }

  loadVisualization() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Products',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Orders',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }

      }
    };
  }
}
