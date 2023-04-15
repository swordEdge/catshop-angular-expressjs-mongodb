import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { IOrder } from 'src/app/models/order.model';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
  providers: [MessageService]
})
export class CustomerProfileComponent implements OnInit {
  customer: ICustomer[] = [];
  orders: IOrder[] = [];

  showContent: boolean = false;
  showEdit: boolean = false;
  showOrder: boolean = false;
  showProfileConfig: boolean = false;

  constructor(
    private custService: CustomerService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router,
    private messageService: MessageService,
    private orderService: OrderService
  ) {

  }

  ngOnInit(): void {
    this.loadingService.showLoading();

    setTimeout(() => {
      this.loadingService.hideLoading();
      this.showContent = true;
    }, 500);

    this.loadDataCustomer();
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

  loadDataCustomer() {
    const token = this.authService.getToken();
    const cust_id = this.custService.getCustomerId();

    if (token === '' || cust_id === '') {
      this.router.navigateByUrl('/login');
      return;
    }

    this.custService.getCustomerById(
      cust_id, 
      token ?? ''
    ).pipe(
      take(1)
    ).subscribe({
      next: ({ data }) => {
        this.customer.push(data);
      },
      error: () => {
        // Unauthorize
        this.router.navigateByUrl('/login');
      }
    });
  }

  onClickLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/product-show');
  }

  onClickEdit() {
    this.showProfileConfig = false;
    this.showOrder = false;
    this.showEdit = !this.showEdit;
  }

  onSubmitEdit() {
    const token = this.authService.getToken();
    const cust_id = this.custService.getCustomerId();

    if (token === '' || cust_id === '') {
      this.router.navigateByUrl('/login');
      return;
    }

    const cust = this.customer[0];

    const updateCust = {
      firstname: cust.firstname,
      lastname: cust.lastname,
      phone: cust.phone
    };

    this.custService.updateCustomerId(
      cust_id,
      updateCust,
      token ?? ''
    ).subscribe({
      next: () => {
        this.messageToast('success', 'Edit profile successe 🐶');
        this.onClickEdit();
      },
      error: (err) => {
        this.messageToast('error', 'Edit profile failed 🐼');
      }
    });
  }

  onClickProfile() {
    this.showProfileConfig = !this.showProfileConfig;
  }

  onClickOrderHist() {
    this.showEdit = false;
    this.showProfileConfig = false;
    this.showOrder = !this.showOrder;


    const token = this.authService.getToken();
    const cust_id = this.custService.getCustomerId();

    if (token === '' || cust_id === '') {
      this.router.navigateByUrl('/login');
      return;
    }

    this.orderService.getOrderByCustomerId(cust_id, token ?? '')
      .subscribe({
        next: ({ data }) => {
          this.orders = data;
          console.log(this.orders);
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}