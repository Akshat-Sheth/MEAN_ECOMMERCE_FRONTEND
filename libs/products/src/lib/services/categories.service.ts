/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
    providedIn:'root'
})

export class CategoriesService {
    apiURLCategories = environment.apiUrl + 'categories';
    constructor(private http: HttpClient){
        
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiURLCategories)
    }

    getCategory(id:string): Observable<any> {
        return this.http.get<any>(`${this.apiURLCategories}/${id}`)
    }

    createCategory(category:Category):Observable<Category> {
        return this.http.post<Category>(this.apiURLCategories,category)
    }

    deleteCategory(category:Category):Observable<Object> {
        console.log(category)
        return this.http.delete<Object>(`${this.apiURLCategories}/${category}`)
        
    }

    updateCategory(category:Category):Observable<any> {
        // return this.http.put<any>('http://localhost:1234/api/v1/categories/'+category._id,category)
        return this.http.put<any>(`${this.apiURLCategories}/${category._id}`, category);
    }
}