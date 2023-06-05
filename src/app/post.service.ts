import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { Post } from './model/post.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Category } from './model/category.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  endPointUrl: string = 'https://angular-mini-project-58446-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postURL: string = this.endPointUrl + 'post.json';
  categoryURL: string = this.endPointUrl + 'categories.json';
  errorHandling = new Subject<any>();


  constructor(private http: HttpClient) { }



  createAndPost(postData: Post){
    console.log(postData);
    this.http.post<{name: string}>(this.postURL, postData, {
      observe: 'response',
      responseType: 'json'
    })
    .subscribe({
      next: (data) => {
        console.log(data);
        this.errorHandling.next(null);
      },
      error: (e) => {
        this.errorHandling.next(e);
      },
    });
  }


  addCategoryAndPost(categoryData: Category){
    console.log(categoryData);
    this.http.post<{name: string}>(this.categoryURL, categoryData, {
      observe: 'response',
      responseType: 'json'
    })
    .subscribe({
      next: (data) => {
        console.log(data);
        this.errorHandling.next(null);
      },
      error: (e) => {
        this.errorHandling.next(e);
      },
    });
  }

  updatePost(postData: {[key: string]: {title: string, image: string, content: string, category: string}}){
    console.log(postData);
    return this.http.patch(this.postURL, postData);
  }

  updateCategory(categoryData: {[key: string]: {name: string}}){
    console.log(categoryData);
    return this.http.patch(this.categoryURL, categoryData);
  }


  deletePost(id: string){
    console.log(id);
    return this.http.delete(this.endPointUrl + "post/" + id + ".json").subscribe();
  }


  fetchCategory(){
    let customParam = new HttpParams();
    customParam = customParam.append('print', 'pretty');
    customParam = customParam.append('custom-param', 'custom-param-value')

    return this.http.get<{[key: string] : Category}>(this.categoryURL, {
      headers: new HttpHeaders({
        'custom-header' : 'hello from custom header',
      }),
      params: customParam,
    })
    .pipe(
      map( responseData => {
        const postArray: Category[] = [];
        for(const keys in responseData){
          if(responseData.hasOwnProperty(keys)){
            postArray.push({...responseData[keys], id: keys})
          }
        }
        return postArray;
      }),
      catchError(
        errorRes => {
          return throwError(errorRes);
        }
      )
    );
  }

  fetchPost(){
    let customParam = new HttpParams();
    customParam = customParam.append('print', 'pretty');
    customParam = customParam.append('custom-param', 'custom-param-value')

    return this.http.get<{[key: string] : Post}>(this.postURL, {
      headers: new HttpHeaders({
        'custom-header' : 'hello from custom header',
      }),
      params: customParam,
    })
    .pipe(
      map( responseData => {
        const postArray: Post[] = [];
        for(const keys in responseData){
          if(responseData.hasOwnProperty(keys)){
            postArray.push({...responseData[keys], id: keys})
          }
        }
        return postArray;
      }),
      catchError(
        errorRes => {
          return throwError(errorRes);
        }
      )
    );
  }
}
