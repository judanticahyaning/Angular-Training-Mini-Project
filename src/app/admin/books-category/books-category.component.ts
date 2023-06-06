import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/model/category.model';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-books-category',
  templateUrl: './books-category.component.html',
  styleUrls: ['./books-category.component.css']
})
export class BooksCategoryComponent implements OnInit, OnDestroy{
  
  loadedCategory: Category[] = [];

  loadedPost: Post[] = [];
  id!: string;
  name!: string;
  description!: string;
  showLoading = false;
  error = null;
  errorSub!: Subscription;

  constructor(private postService: PostService){

  }
  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
  ngOnInit(): void {
    this.fetchPost();
    this.errorSub = this.postService.errorHandling.subscribe(error => {
      this.error = error;
    });
  }


  onCreateCategoryPost(categoryData: { name: string; description: string}){
    this.postService.addCategoryAndPost(categoryData);
    this.fetchPost();

  }

  onUpdateCategory(){
    const data = {
      [this.id!]: {
        name: this.name,
        description: this.description
      },
    };
    console.log(data);
    this.postService.updateCategory(data).subscribe((post) =>{
        console.log(post);
      }
    );
    this.fetchPost();
  }

  onDeletePost(categoryData: Category) {
    console.log(categoryData);
    console.log(categoryData.id);
    this.postService.deleteCategoryPost(categoryData.id!);
    this.fetchPost();

  }

  viewPost(categoryData: Category){
    this.id = categoryData.id!;
    this.name = categoryData.name;
    this.description = categoryData.description;
  }

  private fetchPost(){
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
  }
}
