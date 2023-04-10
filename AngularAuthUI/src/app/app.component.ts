import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  

  


  // ngOnInit(): void {
  //   if (localStorage.getItem('login')) {
  //     this.login = true
  //   }
  //   else {
  //     this.login = false
  //   }
  // }
}

