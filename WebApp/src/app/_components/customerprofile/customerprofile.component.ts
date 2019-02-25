import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.scss']
})
export class CustomerprofileComponent implements OnInit {

  public customerInfo: any = {
    email: '',
    firstname: '',
    lastname: '',
    dateOfBirth: '',
    gender: '',
    occupation: '',
    couponRadius: ''
  };

  constructor(public CustomerLoginService: CustomerService) { }

  ngOnInit() {
    this.customerInfo = this.CustomerLoginService.getCustomerInfo();

    this.format();
  }

  format() {
    const dateOptions = {day: 'numeric', month: 'long', year: 'numeric'};

    this.customerInfo.dateOfBirth = new Date(this.customerInfo.dateOfBirth)
      .toLocaleDateString('en-US', dateOptions);
  }

}
