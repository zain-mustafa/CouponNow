import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../../_services/customer.service';
import { Customer } from '../../_models/customer.model';

@Component({
  selector: 'app-customersignup',
  templateUrl: './customersignup.component.html',
  styleUrls: ['./customersignup.component.css']
})
export class CustomersignupComponent implements OnInit {

  // Creating a customer object using the model to be able to send data to the signup Service
  customer: Customer = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

  // Constructor to initiate customer.service.ts
  constructor( public signupService: CustomerService ) { }

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
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      email: form.value.email,
      password: form.value.password
    };

    // call the function onSignupCustomer through the service.
    this.signupService.onSignUpCustomer(this.customer);
  }

}
