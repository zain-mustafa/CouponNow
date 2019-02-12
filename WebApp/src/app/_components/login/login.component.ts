import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { CustomerService } from '../../_services/customer.service';
import { LoginCred } from '../../_models/logincred.model';
import { OwnerService } from '../../_services/owner.service';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // Set up the object for login credentials
  loginCred: LoginCred = {
    email: '',
    password: ''
  };

  private authStatusListenenr = new Subject<boolean>();

  getAuthStatusListener() {
    return this.authStatusListenenr.asObservable();
  }

  constructor( public CustomerLoginService: CustomerService, public OwnerLoginService: OwnerService,
    public router: Router, public dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  // Function when the login form is submitted.
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // Adds the credentials taken from the form to the loginCred object
    this.loginCred = {
      email: form.value.email,
      password: form.value.password
    };

    this.CustomerLoginService.loginCustomer(this.loginCred).subscribe(response => {
      console.log(response);
      if (response.type === 'customer') {
        this.CustomerLoginService.setLoginSessionVariables(response);
        this.router.navigate(['/']);
      } else {
        localStorage.setItem('ownerToken', response['token']);
        localStorage.setItem('ownerEmail', response['email']);
        this.dataService.setLogin(true);
        this.dataService.setOwner(true);
        this.router.navigate(['/ownerlanding']);
      }
    }, error => {
      this.snackBar.open('Wrong E-mail or Password. Please try again with the correct credentials', 'Dismiss', {
        duration: 5000,
      });
    });

    // Checks for account type value recieved from the form and then initiates the correct service function.
    // if (form.value.type === 'customer') { // If the account type is customer
    //   this.CustomerLoginService.loginCustomer(this.loginCred).subscribe(response => {
    //     localStorage.setItem('customerToken', response['token']);
    //     localStorage.setItem('customerEmail', response['email']);
    //     this.dataService.setLogin(true);
    //     this.dataService.setCustomer(true);
    //     this.router.navigate(['/']);
    //   });

    // } else { // If the account type is business owner
    //   this.OwnerLoginService.loginOwner(this.loginCred).subscribe(response => {
    //     localStorage.setItem('ownerToken', response['token']);
    //     localStorage.setItem('ownerEmail', response['email']);
    //     this.dataService.setLogin(true);
    //     this.dataService.setOwner(true);
    //     this.router.navigate(['/ownerlanding']);
    //   });
    //
      this.authStatusListenenr.next(true);
    }
}
