import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';
import { AuthService } from 'src/app/services/auth.service';
import { IProduct } from 'src/app/models/product.model';
import { ISeller } from 'src/app/models/seller.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  p_id: any;
  product: IProduct[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private sellerService: SellerService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService
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

  onClickCart(id: string) {
    const token = this.authService.getToken();

    if (token === '') {
      this.router.navigateByUrl('/login');
      return;
    }

    this.router.navigate(['/product-cart', id]);
  }
}
