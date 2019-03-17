import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BusinessOwner } from '../../_models/businessowner.model';
import { OwnerService } from '../../_services/owner.service';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { LoginCred } from 'src/app/_models/logincred.model';
import { CustomerService } from 'src/app/_services/customer.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-ownersignup',
  templateUrl: './ownersignup.component.html',
  styleUrls: ['./ownersignup.component.css']
})
export class OwnersignupComponent implements OnInit {

  // Set up an object to store business owner information
  businessOwner: BusinessOwner = {
    type: 'owner',
    firstname: '',
    lastname: '',
    phone: null,
    email: '',
    password: ''
  };

  // Adding the owner.service service tp this file
  constructor(
    public signupService: OwnerService,
    public snackBar: MatSnackBar,
    public router: Router,
    public loginService: CustomerService,
    public dataService: DataService
    ) { }

  ngOnInit() {
  }

  // On Sign up function that is activated when the form is submitted
  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // Setting the values for the business owner
    this.businessOwner = {
      type: 'owner',
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      phone: form.value.phone,
      email: form.value.email,
      password: form.value.password
    };

    // Calls the onSignUpOwner functions from the service.
    this.signupService.onSignUpOwner(this.businessOwner).subscribe(response => {
      this.snackBar.open('Welcome! Your account is created.', 'Dismiss', {
        duration: 5000,
      });
      this.router.navigate(['/']);
    }, error => {
      this.snackBar.open('This E-mail is already taken, Please use a different E-mail address', 'Dismiss', {
        duration: 5000,
      });

    }, () => {
      console.log('logging in as: ' + this.businessOwner.email);

      const loginCred: LoginCred = {
        email: this.businessOwner.email,
        password: this.businessOwner.password
      };

      this.loginService.loginCustomer(loginCred).subscribe(response => {
        console.log(response);

        localStorage.setItem('ownerToken', response['token']);
        localStorage.setItem('ownerEmail', response['email']);
        this.dataService.setLogin(true);
        this.dataService.setOwner(true);
        this.router.navigate(['/ownerlanding']);
      });
    });

  }
}
