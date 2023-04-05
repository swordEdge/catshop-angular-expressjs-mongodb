import { Component } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService]
})
export class SignupComponent {
  signupForm: FormGroup;
  showLoad: boolean = true;

  constructor(
    private custService: CustomerService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      image: ['', Validators.required]
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

  onSubmit() {
    if (!this.signupForm.valid) {
      this.messageToast('warn', 'Please fill complete.');
      return;
    }

    const data = this.signupForm.value;

    if (!data['email'].includes('@')) {
      this.messageToast('warn', 'Email not correct.');
      return;
    }

    this.custService.signUpCustomer(data)
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 1800)

          this.showLoadToNextPage();
        },
        error: (err) => {
          this.messageToast('error', 'Signup failed.');
        }
      });
  }

  showLoadToNextPage() {
    this.showLoad = !this.showLoad;
  }
}
