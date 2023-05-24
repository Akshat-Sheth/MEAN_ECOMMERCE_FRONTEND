import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  currentProductId: string;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private location:Location, private categoryService:CategoriesService, private productsService:ProductService, private messageService:MessageService){

  }

  ngOnInit(): void {
      this._initForm()
      this._checkEditMode()
      this._getCategories()
      console.log(this.productForm())
  }

  private _initForm() {
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
    });
  }

  private _getCategories(){
    this.categoryService.getCategories().subscribe(categories => {
      this.catagories = categories
    })
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();
    productFormData.append("name",this.form.controls.name.value)
    productFormData.append("brand",this.form.controls.brand.value)
    productFormData.append("price",this.form.controls.price.value)
    productFormData.append("category",this.form.controls.category.value)
    productFormData.append("countInStock",this.form.controls.countInStock.value)
    productFormData.append("description",this.form.controls.description.value)
    productFormData.append("richDescription",this.form.controls.richDescription.value)
    productFormData.append("image",this.form.controls.image.value)
    productFormData.append("isFeatured",this.form.controls.isFeatured.value)
    if(this.editMode){
      this._updateProduct(productFormData)
    }else{
      this._addProduct(productFormData);
    }

  }

  private _updateProduct(productFormData) {
    this.productsService.updateProduct(productFormData, this.currentProductId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product is updated!'
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
          detail: 'Product is not updated!'
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(this.currentProductId).subscribe((res) => {
          console.log(res.product)
          this.form.controls.name.setValue(res.product.name);
          this.form.controls.category.setValue(res.product.category._id);
          this.form.controls.brand.setValue(res.product.brand);
          this.form.controls.price.setValue(res.product.price);
          this.form.controls.countInStock.setValue(res.product.countInStock);
          this.form.controls.isFeatured.setValue(res.product.isFeatured);
          this.form.controls.description.setValue(res.product.description);
          this.form.controls.richDescription.setValue(res.product.richDescription);
          this.imageDisplay = res.product.image;
          this.form.controls.image.setValidators([]);
          this.form.controls.image.updateValueAndValidity();
        });
      }
    });
  }

  private _addProduct(productData){
    console.log('reciving value ->',productData)
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
      console.log(this.form.controls.image.value)
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

