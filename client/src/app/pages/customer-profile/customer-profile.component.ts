import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
  providers: [MessageService]
})
export class CustomerProfileComponent implements OnInit {
  customer: ICustomer[] = [];
  showContent: boolean = false;
  showEdit: boolean = false;

  constructor(
    private custService: CustomerService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.loadingService.showLoading();

    setTimeout(() => {
      this.loadingService.hideLoading();
      this.showContent = true;
    }, 1500);

    this.loadDataCustomer();
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
    this.router.navigateByUrl('/login');
  }

  onClickEdit() {
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
}
