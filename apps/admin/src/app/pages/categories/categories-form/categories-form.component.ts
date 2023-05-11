/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit{
  

  form:FormGroup
  isSubmitted = false
  editMode=false
  currentCategoryId = ''

  constructor(private formBuilder:FormBuilder, private router:ActivatedRoute,private location: Location,private CategorieService:CategoriesService, private messageService: MessageService){

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });

    this._checkEditMode();
  }


  onSubmit(){
    this.isSubmitted = true
    if(this.form.invalid){
      return;
    }
    const category:Category = {
      _id : this.currentCategoryId,
      name: this.form.controls.name.value,
      icon: this.form.controls.icon.value,
      color:this.form.controls.color.value
    }
    if(this.editMode === true){
      this._updateCategory(category)
    }else{
      this._addCategory(category)
    }
  
    console.log(this.form.controls.name.value)
  }

  private _updateCategory(category){
    this.CategorieService.updateCategory(category).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is updated!'
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
          detail: 'Category is not updated!'
        });
      }
    );
  }


  private _addCategory(category){
    this.CategorieService.createCategory(category).subscribe(
      ()=>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'category is created' });
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
          detail: 'Category is not created!'
        });
      }
    )
  }

  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params.id) {
        this.currentCategoryId = params.id
        this.editMode = true;
        this.CategorieService.getCategory(params.id).subscribe((res) => {
          this.categoryForm().name.setValue(res.category.name);
          this.categoryForm().icon.setValue(res.category.icon);
          this.categoryForm().color.setValue(res.category.color)
        });
      }
    });
  }

  categoryForm() {
    return this.form.controls
  }



}
