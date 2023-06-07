import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authRequestData, authResponseData } from '../model/auth.model';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

  loadedPosts: Post[] = [];
  id!: string;
  title!: string;
  content!: string;
  image!: string;
  category!: string;
  available!: boolean;
  member!: string;
  isLogin!: boolean ;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ){
    
  }

  ngOnInit(): void {
      this.fetchBook();
      this.isLogin = false;
      console.log(this.isLogin)
  }

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid)
      return;

    const email = loginForm.value.email;
    const password = loginForm.value.password;
    const authReqData: authRequestData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    console.log(authReqData);

    let authObservable: Observable<authResponseData>;
    authObservable = this.authService.login(authReqData);

    authObservable.subscribe({
      next: resData => {
        console.log(resData);
        this.router.navigate(['admin/books-management']);
      },
      error: (error) => {
        console.log(error);
      }
    })
    
    loginForm.reset();
  }

  fetchBook(){
    this.postService.fetchPost().subscribe({
      next: (data) => {
        this.loadedPosts = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
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

  Login(){
    this.isLogin = true;
    
    console.log(this.isLogin)
  }

  Guest(){
    this.isLogin = false;
  }
}
