import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products'
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: []
})


export class CategoriesListComponent implements OnInit {

  categories : Category[] = []

  constructor(private CategoriesService: CategoriesService,private router:Router,private messageService: MessageService,private confirmationService: ConfirmationService){
    
  }

  ngOnInit(): void {
    this._getCategories()
  }

  deleteCategory(id){

    this.confirmationService.confirm({
      message: 'Do you want to Delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.CategoriesService.deleteCategory(id).subscribe(
          () => {
            this._getCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category is not deleted!'
            });
          }
        );
      }
    });
  }

  updateCategory(id){
    this.router.navigateByUrl(`categories/form/${id}`)
  }

  private _getCategories(){
    this.CategoriesService.getCategories().subscribe((cats) => {
      this.categories = cats
    })
  }

}
