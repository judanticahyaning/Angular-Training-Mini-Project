import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'src/app/model/admin.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  endpointUrl: string = 'https://library-miniproject-angular-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postUrl: string = this.endpointUrl + 'post.json';
  errorHandling = new Subject<any>();

  constructor(
    private httpClient: HttpClient
  ) { }

  addMember(member: Member) {
    this.httpClient.post<Member>(this.postUrl, member).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }

  fetchMember() {
    return this.httpClient.get<{ [key: string]: Member }>(this.postUrl)
      .pipe(
        map(responseData => {
          const postArray: Member[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key],id:key })
            }
          }
          return postArray;
        })
      );
  }

  showForEditData(member: Member) {
    const data = {
      fullname: member.fullname,
      age: member.age,
      address: member.address,
      work: member.work,
      phonenumber: member.phonenumber
    }
    return this.httpClient.patch(this.postUrl, data);

  }


  updatePost(memberData: {[key: string]: {fullname: string, age: number, address: string, work: string, phonenumber:string}}){
    console.log(memberData);
    return this.httpClient.patch(this.postUrl, memberData);
  }
}
