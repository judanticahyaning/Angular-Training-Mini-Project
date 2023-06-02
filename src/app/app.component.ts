import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  endpointUrl: string = 'https://library-miniproject-angular-default-rtdb.asia-southeast1.firebasedatabase.app/';
  
  constructor(
    private authService: AuthService
  ){}

  title = 'Books Library Management';

  ngOnInit(): void {
    // this.authService.autoLogin(); 
  }
}
