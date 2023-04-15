import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/services/customer.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  loginForm: FormGroup;
  showLoad: boolean = true;

  constructor(
    private custService: CustomerService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  messageToast(type: string, message: string) {
    this.messageService.clear();
    this.messageService.add({
      severity: type,
      summary: message,
    });
  }

  onClickBack() {
    this.router.navigateByUrl('/product-show');
  }

  showLoadToNextPage() {
    this.showLoad = !this.showLoad;
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.messageToast('warn', 'Please fill complete.');
      return;
    }

    const data = this.loginForm.value;

    if (!data['email'].includes('@')) {
      this.messageToast('warn', 'Email not correct.');
      return;
    }

    this.authService.login(data)
    .subscribe({
      next: (data) => {
        this.custService.setCustomerId(data.body.data._id);

        const token = data.headers.get('Authorization');
        this.authService.setToken(token);

        setTimeout(() => {
          this.router.navigateByUrl('/customer-profile');
        }, 1800);

        this.showLoadToNextPage();
      },
      error: (err) => {
        this.messageToast('error', err);
      }
    })
  }
}
