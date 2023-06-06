import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{
  

  loadedPosts: Post[] = [];
  id!: string;
  title!: string;
  content!: string;
  image!: string;
  category!: string;
  available!: boolean;
  member!: string;

  errorSub!: Subscription;
  error = null;

  showLoading = false;


  constructor(private postService: PostService) {

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

  viewPost(postData: Post) {
    this.id = postData.id!;
    this.title = postData.title;
    this.image = postData.image;
    this.content = postData.content;
    this.category = postData.category;
    this.available = postData.available;
    this.member = postData.member;
  }

  private fetchPost() {
    this.showLoading = true;
    this.postService.fetchPost().subscribe({
      next: (data) => {
        this.showLoading = false;
        this.loadedPosts = data;
      },
      error: (e) => {
        console.log(e);
        this.error = e;
      }
    });
  }
}
