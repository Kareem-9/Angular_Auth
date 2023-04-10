import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  // isOpen = false;

  // toggleNav() {
  //   this.isOpen = !this.isOpen;
  // }
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
}
