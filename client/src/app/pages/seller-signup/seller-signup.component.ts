import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SellerService } from 'src/app/services/seller.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrls: ['./seller-signup.component.css'],
  providers: [MessageService]
})
export class SellerSignupComponent {
  signupForm: FormGroup;
  showLoad: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sellService: SellerService,
    private custService: CustomerService,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.signupForm = this.fb.group({
      store_name: ['', Validators.required],
      store_email: ['', Validators.required],
      store_image: ['', Validators.required],
      store_phone: ['', Validators.required]
    })
  }

  messageToast(type: string, message: string) {
    this.messageService.clear();
    this.messageService.add({
      severity: type,
      summary: message,
    });
  }

  onClickBack() {
    this.router.navigateByUrl('/customer-profile');
  }

  onSubmit() {
    if (!this.signupForm.valid) {
      this.messageToast('warn', 'Please fill complete 🐶');
      return;
    }

    const token = this.authService.getToken();
    const cust_id = this.custService.getCustomerId();

    if (token === '' || cust_id === '') {
      this.router.navigateByUrl('/login');
      return;
    }

    const data = this.signupForm.value;

    if (!data['store_email'].includes('@')) {
      this.messageToast('warn', 'Email not correct 🐹');
      return;
    }

    this.sellService.signupSeller(data, cust_id, token ?? '')
      .subscribe({
        next: (data) => {
          setTimeout(() => {
            this.router.navigateByUrl('/seller-profile');
          }, 1800)

          this.showLoadToNextPage();
        }, 
        error: (err) => {
          if (err === 'Customer can have 1 seller.') {
            console.log(err);
            this.router.navigateByUrl('/customer-profile');
          } else {
            console.log(err);
            this.router.navigateByUrl('/login');
          }
        }
      })
  }

  showLoadToNextPage() {
    this.showLoad = !this.showLoad;
  }
}
