import { Injectable } from '@angular/core';
import { Customer } from '../_models/customer.model';
import { HttpClient } from '@angular/common/http';
import { LoginCred } from '../_models/logincred.model';

@Injectable({providedIn: 'root'})
export class CustomerService {
  // Adds the http module to the service
  constructor(private http: HttpClient) {}

  onSignUpCustomer(customer: Customer) {
    // API call when the customer signs up
    this.http.post('http://localhost:3000/customer/signup', customer)
      .subscribe(response => {
        // displays the response recieved on the browser console.
        console.log(response);
      });
  }

  loginCustomer( loginCred: LoginCred ) {
    // API call when the customer logs in
    this.http.post('http://localhost:3000/customer/login', loginCred)
      .subscribe(response => {
        // displays the response received from the call
        console.log(response);
      });
  }
}
