import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/model/category.model';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-books-category',
  templateUrl: './books-category.component.html',
  styleUrls: ['./books-category.component.css']
})
export class BooksCategoryComponent implements OnInit{
  
  loadedCategory: Category[] = [];

  loadedPost: Post[] = [];
  id: string;
  name: string;
  totalBook: number;
  showLoading = false;
  error = null;
  errorSub: Subscription;

  constructor(private postService: PostService){

  }
  ngOnInit(): void {
    this.fetchPost();
    this.errorSub = this.postService.errorHandling.subscribe(error => {
      this.error = error;
    });
  }


  onCreateCategoryPost(categoryData: { name: string; totalBook: number}){
    categoryData.totalBook = 0;
    this.postService.addCategoryAndPost(categoryData);
    this.fetchPost();

  }

  onUpdateCategory(){
    const data = {
      [this.id!]: {
        name: this.name,
      },
    };
    console.log(data);
    this.postService.updateCategory(data).subscribe((post) =>{
        console.log(post);
      }
    );
    this.fetchPost();
  }

  viewPost(categoryData: Category){
    this.id = categoryData.id!;
    this.name = categoryData.name;
    this.totalBook = categoryData.totalBook;
  }

  private fetchPost(){
    console.log(this.totalBook);
    this.showLoading = true;
    this.postService.fetchCategory().subscribe({
      next:(data) =>{
        this.showLoading = false;
        this.loadedCategory = data;  
      },
      error: (e) =>{
        console.log(e);
        this.error = e;
      }
    });

    // this.postService.fetchPost().subscribe({
    //   next:(data) =>{
    //     this.showLoading = false;
    //     this.loadedPost = data;  
    //   },
    //   error: (e) =>{
    //     console.log(e);
    //     this.error = e;
    //   }
    // });
    // console.log(this.loadedCategory.at(0)!.name);
    // this.setTotalBook();
  }

  // private setTotalBook(){
  //   console.log("masuk ke sini");
    
  //   this.loadedCategory.forEach(function (value){


  //     // const totalItem = this.loadedPost.filter(p => 
  //     //     p.category == element.name
          
  //     //   );
  //       console.log(value.name);
  //       // element.totalBook = totalItem.length;
  //   });
  // }
}
