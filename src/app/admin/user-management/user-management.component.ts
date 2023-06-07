import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User, UserData } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { map,tap } from 'rxjs';
import { authReqDataUser, authResDataUser } from 'src/app/model/auth.model';
import { NgForm } from '@angular/forms';
import { Member } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{
  @ViewChild('showUpdate')showUpdate!: NgForm;

  // endpointUrl: string = 'https://library-miniproject-angular-default-rtdb.asia-southeast1.firebasedatabase.app/';
  // postUrl: string = this.endpointUrl + 'post.json';

  loadedPosts: Member [] = [];
  
  id!: string;
  fullname!: string;
  age!: number;
  address!: string;
  work!: string;
  phonenumber!: string;


  constructor(
    private authSvc: AuthService,
    private httpClient: HttpClient,
    private adminSvc: AdminService
  ){

  }

  ngOnInit(): void {
    this.showMember();
  }

  addingMember(memberData: {id:string; fullname: string; age: number; address: string; work: string; phonenumber: string;}){
    this.adminSvc.addMember(memberData);
    this.showMember();
  }

  showMember(){
    this.adminSvc.fetchMember().subscribe(
      member => {
        this.loadedPosts = member;
        console.log("list Member");
        console.log(member);
      }
    );
  }

  showForEditData(member: Member){
    this.id = member.id!;
    this.fullname = member.fullname;
    this.age = member.age;
    this.address = member.address;
    this.work = member.work;
    this.phonenumber = member.phonenumber;

    console.log(this.showUpdate);
  }

  updateDataMember(){
    const data = {
      [this.id!]: {
        fullname: this.fullname,
        age: this.age,
        address: this.address,
        work: this.work,
        phonenumber: this.phonenumber
      },
    };
    console.log(data);
    this.adminSvc.updatePost(data).subscribe((post) =>{
        console.log(post);
      }
    );
    this.showMember();
  }
  
  onDeleteUser(member: Member){
    this.adminSvc.deleteMember(member.id!);
  }
}