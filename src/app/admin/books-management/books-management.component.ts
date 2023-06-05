import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-books-management',
  templateUrl: './books-management.component.html',
  styleUrls: ['./books-management.component.css']
})
export class BooksManagementComponent implements OnInit, OnDestroy{
  
  loadedPosts: Post[] = [];
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  errorSub: Subscription;
  error = null;

  showLoading = false;


  constructor(private postService: PostService){

  }
  

  onCreatePost(postData: { title: string; image: string; category: string; content: string }){
    this.postService.createAndPost(postData);
    this.fetchPost();
  }

  onUpdatePost(){
    const data = {
      [this.id!]: {
        title: this.title,
        image: this.image,
        content: this.content,
        category: this.category
      },
    };
    console.log(data);
    this.postService.updatePost(data).subscribe((post) =>{
        console.log(post);
      }
    );
    this.fetchPost();
  }

  viewPost(postData: Post){
    this.id = postData.id!;
    this.title = postData.title;
    this.image = postData.image;
    this.content = postData.content;
    this.category = postData.category;
  }
  ngOnInit(): void {
    this.fetchPost();
    this.errorSub = this.postService.errorHandling.subscribe(error => {
      this.error = error;
    });
  }
  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  private fetchPost(){
    this.showLoading = true;
    this.postService.fetchPost().subscribe({
      next:(data) =>{
        this.showLoading = false;
        this.loadedPosts = data;  
      },
      error: (e) =>{
        console.log(e);
        this.error = e;
      }
    });
  }
}
