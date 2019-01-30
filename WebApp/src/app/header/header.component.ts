import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public showLogout = false;
  private loginSub: Subscription;

  constructor(public router: Router, private dataService: DataService ) {
    if (localStorage.getItem('token')) {
      this.showLogout = true;
    }

    // subscribe to home component messages
    this.loginSub = this.dataService.getLogin().subscribe(message => { this.showLogout = message; });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.loginSub.unsubscribe();
  }

  public logout() {
    localStorage.setItem('token', '');
    this.router.navigate(['/login']);
    this.showLogout = false;
  }

}
