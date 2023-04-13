import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { SellerService } from 'src/app/services/seller.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { ISeller } from 'src/app/models/seller.model';
import { LoadingService } from 'src/app/services/loading.service';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { IProduct } from 'src/app/models/product.model';
import { IOrder } from 'src/app/models/order.model';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SellerProfileComponent {
  productEdit: IProduct = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    image: '',
    category: '',
    seller_id: ''
  };

  seller: ISeller[] = [];
  orders: IOrder[] = [];
  products: IProduct[] = [];
  total_sale: number = 0;

  storeForm: FormGroup = this.fb.group({});
  addProdForm: FormGroup;

  showAdd: boolean = false;
  showContent: boolean = false;
  showGraph: boolean = true;
  showStoreManage: boolean = false;
  showStockManage: boolean = false;

  addProduct: boolean = false;
  editProduct: boolean = false;
  sellerEdit: boolean = false;

  data: any;
  options: any;

  constructor(
    private router: Router,
    private custService: CustomerService,
    private sellService: SellerService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private prodService: ProductService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.addProdForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadingService.showLoading();

    setTimeout(() => {
      this.loadingService.hideLoading();
      this.loadProductData();
      this.loadVisualization();
      this.loadOrderData();
      this.showContent = true;
    }, 1500);

    this.LoadSellerData();
  }

  ngOnDestroy() {
    this.loadingService.hideLoading();
  }

  messageToast(type: string, message: string) {
    this.messageService.clear();
    this.messageService.add({
      severity: type,
      summary: message,
    });
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
        this.seller = [];
        this.seller.push(...data.data);

        this.sellService.setSellerId(this.seller[0]._id);
      },
      error: (err) => {
        console.log(err);
        // Unauthorization
        if (err === 'Unauthorized.') {
          console.log(err);
          this.router.navigateByUrl('/login');
        } else {
          console.log(err);
          this.router.navigateByUrl('/seller-signup');
        }
      }
    })
  }

  loadProductData() {
    const token = this.authService.getToken();
    const sell_id = this.sellService.getSellerId();

    if (token === '') {
      this.router.navigateByUrl('/login');
      return;
    }

    this.prodService.getProductsBySellerId(sell_id, token ?? '')
      .subscribe({
        next: ({ data }) => {
          this.products = [];

          if (data.length > 0) {
            this.products = data;
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  loadOrderData() {
    const token = this.authService.getToken();
    const sell_id = this.sellService.getSellerId();

    if (token === '') {
      this.router.navigateByUrl('/login');
      return;
    }

    this.orderService.getOrderBySellerId(sell_id, token ?? '')
      .subscribe({
        next: ({ data }) => {
          this.orders = [];

          if (data.length > 0) {
            this.orders = data;

            this.total_sale = this.orders.reduce((acc, curr) => acc + curr.total_price, 0);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
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

  setStoreForm() {
    this.storeForm = this.fb.group({
      store_name: [this.seller[0].store_name, Validators.required],
      store_email: [this.seller[0].store_email, [Validators.required, Validators.email]],
      store_image: [this.seller[0].store_image, Validators.required],
      store_phone: [this.seller[0].store_phone, Validators.required]
    })
  }

  onClickStoreManage() {
    this.showStoreManage = true;
    this.showGraph = false;

    if (this.showStoreManage) this.setStoreForm();
  }

  onClickStockManage() {
    this.showStockManage = true;
    this.showGraph = false;
  }

  onClickBack() {
    this.showStoreManage = false;
    this.showStockManage = false;
    this.sellerEdit = false;
    this.showGraph = true;
  }

  onSubmitUpdateStore() {
    if (!this.storeForm.valid) {
      this.messageToast('warn', 'Please fill correct data 🐼');
      return;
    }

    const token = this.authService.getToken();
    const sell_id = this.sellService.getSellerId();

    if (token === '') {
      this.router.navigateByUrl('/login');
      return;
    }

    const data = this.storeForm.value;

    this.sellService.updateById(data, sell_id, token ?? '')
      .subscribe({
        next: () => {
          this.LoadSellerData();
          this.onClickBack();
          this.messageToast('success', 'Update seller success 🐶');
        },
        error: (err) => {
          console.log(err);
          this.messageToast('error', 'Something went wrong 🙈');
        }
      })
  }

  deleteSeller(event: Event) {
    this.sellerEdit = false;

    this.confirmationService.confirm({
      target: event.target ?? undefined,
      message: 'Are you sure that you want to delete seller account?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const token = this.authService.getToken();
        const sell_id = this.sellService.getSellerId();

        if (token === '') {
          this.router.navigateByUrl('/login');
          return;
        }

        this.sellService.deleteAccount(sell_id, token ?? '')
          .subscribe({
            next: () => {
              this.sellService.removeSellerId();
              this.router.navigateByUrl('/customer-profile');
            },
            error: (err) => {
              console.log(err);
              this.messageToast('error', 'Something went wrong 🙈');
            }
          })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  editSeller() {
    this.sellerEdit = !this.sellerEdit;
  }

  addProd() {
    this.addProduct = !this.addProduct;
    this.editProduct = false;
  }

  onSubmitAddProduct() {
    if (!this.addProdForm.valid) {
      this.messageToast('warn', 'Please fill correct data 🐼');
      return;
    }

    const data = this.addProdForm.value;
    const token = this.authService.getToken();
    const sell_id = this.sellService.getSellerId();

    if (token === '') {
      this.router.navigateByUrl('/login');
      return;
    }

    this.prodService.createProduct(data, sell_id, token ?? '')
      .subscribe({
        next: () => {
          this.messageToast('success', 'Add product success 🐶');

          this.loadProductData();

          this.addProdForm.reset();

          this.addProduct = false;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  editProd() {
    this.editProduct = !this.editProduct;
    this.addProduct = false;
  }

  openEditProd(id: any) {
    this.editProduct = true;

    const token = this.authService.getToken();

    if (token === '') {
      this.router.navigateByUrl('/login');
      return;
    }

    this.prodService.getProductById(id, token ?? '')
      .subscribe({
        next: ({ data }) => {
          this.productEdit = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  onSubmitEditProduct() {
    const data = {
      name: this.productEdit.name,
      description: this.productEdit.description,
      price: this.productEdit.price,
      quantity: this.productEdit.quantity,
      image: this.productEdit.image,
      category: this.productEdit.category
    };

    const token = this.authService.getToken();
    const id = this.productEdit._id;

    if (token === '') {
      this.router.navigateByUrl('/login');
      return;
    }

    this.prodService.updateProductById(data, id, token ?? '')
      .subscribe({
        next: () => {
          this.messageToast('success', 'Add product success 🐶');

          this.editProduct = false;

          this.loadProductData();
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  deleteProduct(id: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        const token = this.authService.getToken();

        if (token === '') {
          this.router.navigateByUrl('/login');
          return;
        }

        this.prodService.deleteProductById(id, token ?? '')
          .subscribe({
            next: () => {
              this.messageToast('success', 'Delete product success 🐶');
              this.loadProductData();
            },
            error: (err) => {
              console.log(err);
            }
          })
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }
}
