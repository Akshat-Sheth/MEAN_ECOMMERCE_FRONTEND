import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Product, ProductService } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {


  editMode  = false
  form: FormGroup
  isSubmitted = false;
  catagories = []
  imageDisplay: string | ArrayBuffer;

  constructor(private formBuilder: FormBuilder,private location:Location, private categoryService:CategoriesService, private productsService:ProductService, private messageService:MessageService){

  }

  ngOnInit(): void {
      this._initForm()
      this._getCategories()
      console.log(this.productForm())
  }

  private _initForm(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false]
    })
  }

  private _getCategories(){
    this.categoryService.getCategories().subscribe(categories => {
      this.catagories = categories
    })
  }


  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      console.log('c',this.form.controls.category.invalid)
      console.log('b',this.form.controls.brand.invalid)
      return;
    }

    const productFormData = new FormData();

    Object.keys(this.productForm).map((key)=>{
      productFormData.append(key,this.productForm[key].value)
    })
    this._addProduct(productFormData) 

  }

  private _addProduct(productData:FormData){
    this.productsService.createProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} is created!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created!'
        });
      }
    );
  }

  onCancel(){
    console.log('on Cancel')
  }

  onImageUpload(event){
    const file = event.target.files[0];
    if(file){
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }
      fileReader.readAsDataURL(file)
    }
  }

  productForm(){
    return this.form.controls
  }

  

}
