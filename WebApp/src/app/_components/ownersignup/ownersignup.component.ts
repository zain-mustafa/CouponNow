import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BusinessOwner } from '../../_models/businessowner.model';
import { OwnerService } from '../../_services/owner.service';

@Component({
  selector: 'app-ownersignup',
  templateUrl: './ownersignup.component.html',
  styleUrls: ['./ownersignup.component.css']
})
export class OwnersignupComponent implements OnInit {

  // Set up an object to store business owner information
  businessOwner: BusinessOwner = {
    firstname: '',
    lastname: '',
    phone: null,
    email: '',
    password: ''
  };

  // Adding the owner.service service tp this file
  constructor( public signupService: OwnerService ) { }

  ngOnInit() {
  }

  // On Sign up function that is activated when the form is submitted
  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // Setting the values for the business owner
    this.businessOwner = {
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      phone: form.value.phone,
      email: form.value.email,
      password: form.value.password
    };

    // Calls the onSignUpOwner functions from the service.
    this.signupService.onSignUpOwner(this.businessOwner);
  }
}
