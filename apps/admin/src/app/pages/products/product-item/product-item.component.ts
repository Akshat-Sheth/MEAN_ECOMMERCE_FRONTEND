import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '@bluebits/products';

@Component({
  selector: 'admin-product-item',
  templateUrl: './product-item.component.html'
})
export class ProductItemComponent  implements OnInit  {

  products = []

  constructor( private productService:ProductService, private router:Router ){
    console.log('hello')
  }

  ngOnInit(): void {
      this._getProducts()
  }

  private _getProducts() {
    this.productService.getProducts().subscribe(res => {
      console.log(res)
      this.products = res
    })
  }

  updateProduct(productid: string) {
    this.router.navigateByUrl(`products/form/${productid}`);
  }



}

