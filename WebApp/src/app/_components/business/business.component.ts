import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { Business } from 'src/app/_models/business.model';
import {NewBusiness} from 'src/app/_models/newbusiness.model';
import { BusinessService } from 'src/app/_services/business.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  subdocbusiness: Business = {
    businessname: '',
    licensenum: '',
    locations: [],
  }

  newbusiness: NewBusiness = {
    owneremail: '',
    business: this.subdocbusiness,
  };

  constructor(public businessService: BusinessService) { }

  ngOnInit() {
  }

  addBusiness(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.subdocbusiness = {
      businessname: form.value.businessName,
      licensenum: form.value.licenseNum,
      locations: []
      /*
      streetnum: form.value.streetNum,
      streetname: form.value.streetName,
      city: form.value.city,
      postalcode: form.value.postalCode,
      */   
    };

    this.newbusiness = {
      owneremail: localStorage.getItem('ownerEmail'),
      business: this.subdocbusiness,
    }

    console.log(this.newbusiness);
    //console.log(localStorage.token);
    console.log(localStorage.getItem('ownerEmail'));
    // Chnage to test pushing
    //bind owner from token??

    this.businessService.addBusiness(this.newbusiness);
    

    form.resetForm('');

  }
}
