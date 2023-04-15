import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { IProduct } from 'src/app/models/product.model';
import { filterCategory } from 'src/app/helpers/handleFactory';
import { MessageService } from 'primeng/api';
import { ICustomer } from 'src/app/models/customer.model';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css'],
  providers: [MessageService]
})
export class ProductShowComponent implements OnInit {
  products: IProduct[] = [];
  customer: ICustomer[] = [];

  alls: IProduct[] = [];
  cats: IProduct[] = [];
  tools: IProduct[] = [];
  foods: IProduct[] = [];
  toys: IProduct[] = [];
  searchs: IProduct[] = [];

  searchForm: FormGroup;
  searchAction: boolean = false;
  userLogin: boolean = false;
  showContent: boolean = false;
  cateSelect: string = 'alls';

  constructor(
    private router: Router,
    private prodService: ProductService,
    private sellService: SellerService,
    private authService: AuthService,
    private custService: CustomerService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private loadingService: LoadingService,
  ) { 
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadingService.showLoading();

    setTimeout(() => {
      this.loadingService.hideLoading();
      this.showContent = true;
    }, 1000);

    this.loadProductData();
  }

  ngOnDestroy() {
    this.loadingService.hideLoading();
    window.location.reload();
  }

  messageToast(type: string, message: string) {
    this.messageService.clear();
    this.messageService.add({
      severity: type,
      summary: message,
    });
  }

  loadProductData() {
    const token = this.authService.getToken();
    const sell_id = this.sellService.getSellerId();
    const cust_id = this.custService.getCustomerId();

    console.log(token, sell_id, cust_id);

    // CHECK LOGIN, SELLER
    if (cust_id !== '') {
      if (token === '') {
        this.router.navigateByUrl('/login');
        return;
      }

      this.userLogin = true;

      this.custService.getCustomerById(cust_id, token ?? '')
        .subscribe({
          next: ({ data }) => {
            this.customer = [data];
          },
          error: (err) => {
            console.log(err);
          }
        });

      this.sellService.getSellerByCustomerId(cust_id, token ?? '')
        .subscribe({
          next: ({ data }) => {
            this.prodService.getProductByNotSellerId(data[0]._id, token ?? '')
              .subscribe({
                next: ({ data }) => {
                  this.alls = data.filter((d: any) => d.quantity > 0);
                  this.products = this.alls;
                },
                error: (err) => {
                  console.log(err);
                }
              });
          },
          error: (err) => {
            this.prodService.getAllProduct()
              .subscribe({
                next: ({ data }) => {
                  this.alls = data.filter((d: any) => d.quantity > 0);
                  this.products = this.alls;
                },
                error: (err) => {
                  console.log(err);
                }
              })
          }
        });
    } else {
      this.prodService.getAllProduct()
        .subscribe({
          next: ({ data }) => {
            this.alls = data.filter((d: any) => d.quantity > 0);
            this.products = this.alls;
          },
          error: (err) => {

            console.log('hi' + err);
          }
        })
    }
  }

  onClickCategory(cate: string) {
    this.messageService.clear();

    if (!this.searchForm.valid) {
      this.searchAction = false;
    }

    this.cateSelect = cate;
    const search = this.searchAction;
    const data = search ? this.searchs : this.alls;

    console.log(data);
    if ('alls' === cate) {
      this.products = data;
    }

    if ('cats' === cate) {
      const cats = filterCategory(data, 'น้องแมว');
      this.products = cats;

      if(cats.length === 0) {
        this.messageToast('warn', 'Not have items 🐶')
      }
    }

    if ('tools' === cate) {
      const tools = filterCategory(data, 'อุปกรณ์เสริม');
      this.products = tools;

      if(tools.length === 0) {
        this.messageToast('warn', 'Not have items 🐶')
      }
    }

    if ('foods' === cate) {
      const foods = filterCategory(data, 'อาหารและขนม');
      this.products = foods;

      if(foods.length === 0) {
        this.messageToast('warn', 'Not have items 🐶')
      }
    }

    if ('toys' === cate) {
      const toys = filterCategory(data, 'ของเล่น');
      this.products = toys;

      if(toys.length === 0) {
        this.messageToast('warn', 'Not have items 🐶')
      }
    }
  }

  onSubmitSearch() {
    if (!this.searchForm.valid) {
      this.products = this.alls;
      return;
    }

    const { search } = this.searchForm.value;

    this.prodService.searchProductByName(search)
      .subscribe({
        next: ({ data }) => {
          this.products = data;
          this.searchs = data;
          this.searchAction = true;
          this.cateSelect = 'alls';
        },
        error: (err) => {
          this.messageToast('warn', `Not founded ${search} 🐼`);
          this.products = this.alls;  
        }
      })
  }

  onClickProduct(id: string) {
    this.prodService.setProductId(id);
    this.router.navigateByUrl('/product-detail');
  }
}
