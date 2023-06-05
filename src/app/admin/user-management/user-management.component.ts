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

  endpointUrl: string = 'https://library-miniproject-angular-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postUrl: string = this.endpointUrl + 'post.json';

  loadedPosts: any [] |undefined;
  
  constructor(
    private authSvc: AuthService,
    private httpClient: HttpClient,
    private adminSvc: AdminService
  ){

  }

  ngOnInit(): void {
  this.showMember();
  }

  addingMember(member: Member){
    console.log(member);
    this.adminSvc.addMember(member);
  }

  showMember(){
    this.adminSvc.fetchMember().subscribe(
      member => {
        this.loadedPosts = member;
        console.log(member)
      }
    )
  }

  showForEditData(member: Member){
      this.showUpdate.setValue({
      id: member.id,
      fullname: member.fullname,
      dateOfBirth: member.dateOfBirth,
      address: member.address,
      work: member.work,
      phonenumber: member.phoneNumber
    });
    console.log(this.showUpdate);
  }

  updateDataMember(member: Member){

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