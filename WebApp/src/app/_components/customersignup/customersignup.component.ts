import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../../_services/customer.service';
import { Customer } from '../../_models/customer.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';
import {LoginCred} from '../../_models/logincred.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-customersignup',
  templateUrl: './customersignup.component.html',
  styleUrls: ['./customersignup.component.css']
})
export class CustomersignupComponent implements OnInit {

  // Creating a customer object using the model to be able to send data to the signup Service
  customer: Customer = {
    type: '',
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

  private authStatusListener = new Subject<boolean>();

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // Constructor to initiate customer.service.ts
  constructor( public signupService: CustomerService, public router: Router, public snackBar: MatSnackBar ) { }

  ngOnInit() {
  }

  // On Sign up function called when the user submits the form.
  onSignup(form: NgForm) {
    // If the form is invalid, return
    if (form.invalid) {
      return;
    }
    // If valid edite the customer object with the submitted values.
    this.customer = {
      type: 'customer',
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      email: form.value.email,
      password: form.value.password
    };

    // call the function onSignupCustomer through the service.
    this.signupService.onSignUpCustomer(this.customer).subscribe(response => {
      this.snackBar.open('Welcome! Your account is created. Let the savings begin!', 'Dismiss', {
        duration: 5000,
      });
    }, error => {
      this.snackBar.open('This E-mail is already taken, Please use a different E-mail address', 'Dismiss', {
        duration: 5000,
      });

    }, () => {
      console.log('logging in as: ' + this.customer.email);

      const loginCred: LoginCred = {
        email: this.customer.email,
        password: this.customer.password
      };

      this.signupService.loginCustomer(loginCred).subscribe(response => {
        console.log(response);

        this.signupService.setLoginSessionVariables(response);

        this.router.navigate(['/firsttime']);
      });
    });

    this.authStatusListener.next(true);
  }

}
