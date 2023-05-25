import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
// import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CardModule } from 'primeng/card'
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview'
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService, ProductService } from '@bluebits/products';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService } from 'primeng/api'
import { ColorPickerModule } from 'primeng/colorpicker';
import { ProductItemComponent } from './pages/products/product-item/product-item.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import {  InputNumberModule } from 'primeng/inputnumber'
import {  InputTextareaModule } from 'primeng/inputtextarea'
import {  InputSwitchModule } from 'primeng/inputswitch'
import { DropdownModule } from 'primeng/dropdown'
import { EditorModule } from 'primeng/editor';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { UsersService } from '@bluebits/users'
import { TagModule } from 'primeng/tag'
import { InputMaskModule } from 'primeng/inputmask'

const UX_MODULE = [CardModule,InputMaskModule,TagModule,EditorModule,DropdownModule,InputSwitchModule,InputTextareaModule,ToolbarModule,ColorPickerModule,InputTextModule,ButtonModule,DataViewModule,ToastModule,InputNumberModule]

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path:'categories',
        component:CategoriesListComponent
      },
      {
        path:'categories/form',
        component:CategoriesFormComponent
      },
      {
        path:'categories/form/:id',
        component:CategoriesFormComponent
      },
      {
        path:'products',
        component:ProductItemComponent
      },
      {
        path:'products/form',
        component:ProductFormComponent
      },
      {
        path:'products/form/:id',
        component:ProductFormComponent
      },
      {
        path:'users',
        component:UserListComponent
      },
      {
        path:'users/form',
        component:UserFormComponent
      },
      {
        path:'users/form/:id',
        component:UserFormComponent
      }
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    ShellComponent,
    SidebarComponent,
    DashboardComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    ProductItemComponent,
    ProductFormComponent,
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    TableModule,
    ...UX_MODULE,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ConfirmDialogModule
  ],
  providers: [CategoriesService,MessageService, ConfirmationService,ProductService,UsersService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
