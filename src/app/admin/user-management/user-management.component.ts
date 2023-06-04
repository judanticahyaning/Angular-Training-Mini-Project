import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User, UserData } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { map,tap } from 'rxjs';
import { authReqDataUser, authResDataUser } from 'src/app/model/auth.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{
  @ViewChild('showUpdate')
  showUpdate!: NgForm;

  endpointUrl: string = 'https://library-miniproject-angular-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postUrl: string = this.endpointUrl + 'post.json';

  loadedPosts: any [] |undefined;
  // menuItems: any[] | undefined;

  constructor(
    private authSvc: AuthService
  ){

  }


  ngOnInit(): void {
   this.fetchUser();
  }

  fetchUser(){
    this.authSvc.fetchDataUser().subscribe(
      post => {
        // this.loadedPosts = post;
        console.log(post);
      }
    )

    
  } 
}

  // editDataUser(data: authResDataUser){
  //   console.log("bisa edit")
  //   console.log(data)
  //   // this.authSvc.updateDataUser(data);
  //   this.authSvc.updateDataUser(data).subscribe(
  //     dataUpdate => {
  //       console.log(dataUpdate)
  //     }
  //   );
  // }
  
  // showDataForUpdate(data: authResDataUser){
  //   this.showUpdate.setValue({
  //     // id: data.id,
  //     email: data.email,
  //     password: data.password
  //   });
  //   console.log(this.showUpdate);
  //   console.log(data)
  // }

  // deleteDataUser(){
  //   console.log("bisa delete")
  // }