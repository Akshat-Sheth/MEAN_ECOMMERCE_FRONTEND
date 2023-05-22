/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
    providedIn:'root'
})

export class ProductService {
    apiURLProducts = environment.apiUrl + 'products';
    constructor(private http: HttpClient){
        
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiURLProducts)
    }

    createProduct(productData: FormData): Observable<Product> {
        return this.http.post<Product>(this.apiURLProducts, productData);
      }
    
      getProduct(productId: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
      }
    
      updateProduct(productData: FormData, productid: string): Observable<Product> {
        return this.http.put<Product>(`${this.apiURLProducts}/${productid}`, productData);
      }
    
      deleteProduct(productId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
      }

    // getCategory(id:string): Observable<any> {
    //     return this.http.get<any>(`${this.apiURLCategories}/${id}`)
    // }

    // createCategory(category:Category):Observable<Category> {
    //     return this.http.post<Category>(this.apiURLCategories,category)
    // }

    // deleteCategory(category:Category):Observable<Object> {
    //     console.log(category)
    //     return this.http.delete<Object>(`${this.apiURLCategories}/${category}`)
        
    // }

    // updateCategory(category:Category):Observable<any> {
    //     // return this.http.put<any>('http://localhost:1234/api/v1/categories/'+category._id,category)
    //     return this.http.put<any>(`${this.apiURLCategories}/${category._id}`, category);
    // }
}