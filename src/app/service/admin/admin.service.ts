import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member, rentBook, returnBook } from 'src/app/model/admin.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // endpointUrl: string = 'https://library-miniproject-angular-default-rtdb.asia-southeast1.firebasedatabase.app/';
  endpointUrl: string = 'https://angular-mini-project-58446-default-rtdb.asia-southeast1.firebasedatabase.app/';
  
  // postUrl: string = this.endpointUrl + 'issue.json';
  postUrl: string = this.endpointUrl + 'post.json';
  rentUrl: string = this.endpointUrl + 'rent.json';
  returnUrl: string = this.endpointUrl + 'return.json';
  memberUrl: string = this.endpointUrl + 'member.json';

  errorHandling = new Subject<any>();

  constructor(
    private httpClient: HttpClient
  ) { }

  addMember(member: Member) {
    console.log("masuk addMember service")
    this.httpClient.post<{name: string}>(this.memberUrl, member, {
      observe: 'response',
      responseType: 'json'
    })
    .subscribe({
      next: (data) => {
        console.log(data);
        this.errorHandling.next(null);
      },
      error: (e) => {
        this.errorHandling.next(e);
      },
    });
  }

  fetchMember() {
    return this.httpClient.get<{ [key: string]: Member }>(this.memberUrl)
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

  fetchHistoryRent(){
    return this.httpClient.get<{ [key: string]: rentBook }>(this.rentUrl)
      .pipe(
        map(responseData => {
          const postArray: rentBook[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key],id:key })
            }
          }
          return postArray;
        })
      );
  }

  fetchHistoryReturn(){
    return this.httpClient.get<{ [key: string]: returnBook }>(this.returnUrl)
      .pipe(
        map(responseData => {
          const postArray: returnBook[] = [];
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
    return this.httpClient.patch(this.memberUrl, memberData);
  }

  addHistoryRent(rentReturn: rentBook){
    this.httpClient.post<{name: string}>(this.rentUrl, rentReturn, {
      observe: 'response',
      responseType: 'json'
    })
    .subscribe({
      next: (data) => {
        console.log(data);
        this.errorHandling.next(null);
      },
      error: (e) => {
        this.errorHandling.next(e);
      },
    });
  }

  addHistoryReturn(rentReturn: returnBook){
    this.httpClient.post<{name: string}>(this.returnUrl, rentReturn, {
      observe: 'response',
      responseType: 'json'
    })
    .subscribe({
      next: (data) => {
        console.log(data);
        this.errorHandling.next(null);
      },
      error: (e) => {
        this.errorHandling.next(e);
      },
    });
  }

  updateListRentReturn(postData: { 
    [key: string]: 
    { title: string, 
      content: string, 
      image: string,
      category: string,
      available: boolean,
      member: string
    } }) {
      return this.httpClient.patch(this.postUrl, postData);
  }

  deleteMember(id:string){
    return this.httpClient.delete(this.endpointUrl + "member/" + id + ".json").subscribe();
  }
}
