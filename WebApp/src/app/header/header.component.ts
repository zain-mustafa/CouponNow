import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../_services/data.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Bootstrap Template Navbar Variables - Do not change unless needed
  private toggleButton: any;
  private sidebarVisible: boolean;
  // End of Template Variables

  public showLogout = false;
  private loginSub: Subscription;
  private ownerStatusSub: Subscription;
  private customerStatusSub: Subscription;
  public ownerStatus = false;
  public customerStatus = false;

  constructor(
    public router: Router,
    private dataService: DataService,
    private element: ElementRef ) {

    if (localStorage.getItem('token')) {
      this.showLogout = true;
    }

    // if (localStorage.getItem('customerType')) {
    //   if (localStorage.getItem('customerType') === 'owner') {
    //     this.ownerStatus = true;
    //   }
    // }

    // subscribe to home component messages
    this.loginSub = this.dataService.getLogin().subscribe(message => { this.showLogout = message; });
    this.ownerStatusSub = this.dataService.getOwnerStatus().subscribe(message => { this.ownerStatus = message; });
    this.customerStatusSub = this.dataService.getCustomerStatus().subscribe(message => { this.customerStatus = message; });
  }

  ngOnInit() {

    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.loginSub.unsubscribe();
    this.ownerStatusSub.unsubscribe();
    this.customerStatusSub.unsubscribe();
  }

  public logout() {
    localStorage.setItem('ownerToken', '');
    localStorage.setItem('customerToken', '');
    localStorage.setItem('email', '');
    this.router.navigate(['/login']);
    this.showLogout = false;
    this.ownerStatus = false;
    this.customerStatus = false;
  }

  // Template Functions - Keep At Bottom of .ts File
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    setTimeout(function() {
        toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }

  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
        this.sidebarOpen();
    } else {
        this.sidebarClose();
    }
  }

}
