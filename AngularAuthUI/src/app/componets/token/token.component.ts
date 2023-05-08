import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent {

  expirationTime!: number;
  timer: any;

  constructor(private http: HttpClient) { }

  setTokenExpiration() {
    clearInterval(this.timer);
    const url = 'https://localhost:7114/api/User/token/expire';
    this.http.post(url, this.expirationTime).subscribe();
  }

  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.expirationTime--;
    }, 1);
  }

  stopTimer() {
    clearInterval(this.timer);
  }
}
