import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-books-category',
  templateUrl: './books-category.component.html',
  styleUrls: ['./books-category.component.css']
})
export class BooksCategoryComponent implements OnInit{
  
  loadedPosts: Post[] = [];
  category: string;
  totalBook: number;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  onCreateCategoryPost(postData: { title: string; image: string; category: string; content: string }){
    
  }
}
