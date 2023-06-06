import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { rentBook, returnBook } from 'src/app/model/admin.model';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/post.service';
import { AdminService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-books-issue',
  templateUrl: './books-issue.component.html',
  styleUrls: ['./books-issue.component.css']
})
export class BooksIssueComponent implements OnInit {
  @ViewChild('show')
  show!: NgForm;

  loadedPosts: Post[] = [];
  rentReturn: rentBook[] = [];
  returnBooks: returnBook[] = [];

  id!: string;
  title!: string;
  content!: string;
  image!: string;
  category!: string;
  available!: boolean;
  member!: string;

  constructor(
    private postSvc: PostService,
    private adminSvc: AdminService
  ) {

  }
  ngOnInit(): void {
    this.fetchBook();
    this.historyRent();
    this.historyReturn();
  }

  fetchBook() {
    this.postSvc.fetchPost().subscribe({
      next: (data) => {
        this.loadedPosts = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  historyRent() {
    this.adminSvc.fetchHistoryRent().subscribe({
      next: (data) => {
        console.log(data)
        this.rentReturn = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  historyReturn(){
    this.adminSvc.fetchHistoryReturn().subscribe({
      next: (data) => {
        console.log(data)
        this.returnBooks = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  showRent(postData: Post) {
    this.id = postData.id!;
    this.title = postData.title;
    this.content = postData.content;
    this.image = postData.image;
    this.category = postData.category;
    this.available = postData.available;
    this.member = postData.member;
  }

  rentBook(rentReturn: {
    id: string;
    title: string;
    content: string;
    image: string;
    category: string;
    available: boolean;
    member: string;
  }) {
    rentReturn.available = false;

    const data = {
      [this.id!]: {
        title: rentReturn.title,
        content: rentReturn.content,
        image: rentReturn.image,
        category: rentReturn.category,
        available: rentReturn.available,
        member: rentReturn.member
      }
    }
    console.log(data)

    this.adminSvc.updateListRentReturn(data).subscribe((update) => {
      console.log(update);
    });
    this.adminSvc.addHistoryRent(rentReturn);
    this.fetchBook();
  }

  returnBook(rentReturn: {
    id: string;
    title: string;
    content: string;
    image: string;
    category: string;
    available: boolean;
    member: string;
  }){
    rentReturn.available = true;

    this.adminSvc.addHistoryReturn(rentReturn);

    
    const data = {
      [this.id!]: {
        title: rentReturn.title,
        content: rentReturn.content,
        image: rentReturn.image,
        category: rentReturn.category,
        available: rentReturn.available,
        member: ""
      }
    }
    this.adminSvc.updateListRentReturn(data).subscribe((update) => {
      console.log(update);
    });
    
  }
}
