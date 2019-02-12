import { Component, OnInit, Input } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { Business } from 'src/app/_models/business.model';
import { BusinessLocation } from 'src/app/_models/businesslocation.model';
import { BusinessService } from 'src/app/_services/business.service';
import { BusinessQuery } from 'src/app/_models/businessquery.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.component.html',
  styleUrls: ['./addlocation.component.scss']
})
export class AddLocationComponent implements OnInit {

  bname: string;
  newlocation: BusinessLocation;
  owneremail = localStorage.ownerEmail;
  businessquery: BusinessQuery = {
    owneremail: this.owneremail,
    businessindex: null,
    location: null
  }
  business: Business;
  businesslist: Business[] = [];
  private businessSubs : Subscription;
  index: Number;

  constructor(public businessService: BusinessService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.owneremail);
    this.businessService.getBusinesses(this.businessquery);
    this.businessSubs = this.businessService.getPostsUpdateListener()
    .subscribe((business: Business[]) => {
      this.businesslist = business;
    });
    console.log(this.businesslist);
  }

  onChangeBusiness(businessName) {
    //console.log(businessName);
    }

  addLocation(form: NgForm) {
    if (form.invalid) {
      return;
    }
    
    this.newlocation = {
    streetnum: form.value.streetNum,
    streetname: form.value.streetName,
    city: form.value.city,
    postalcode: form.value.postalCode,
    lon: null,
    lat: null,
    }
    this.bname = form.value.business;
    //console.log(this.bname)

    this.index = this.businesslist.findIndex( business => business.businessname === form.value.business );

    console.log(this.index);
    
    this.businessquery = {
      owneremail: this.owneremail,
      businessindex: this.index,
      location: this.newlocation
    }
    //this.businessquery.businessname = form.value.businessName;
    this.businessquery.location = this.newlocation;
    //console.log(form.value.business);
    //this.businessquery.business: get business name??
    console.log(this.businessquery);
    //console.log(localStorage.token);

    this.businessService.addLocation(this.businessquery).subscribe(response => {
      console.log("Addlocatiom component response" + response);
      this.snackBar.open(response.message, 'Dismiss', {
        duration: 5000,
      });
    }, error => {
      this.snackBar.open('Error. Add location failed', 'Dismiss', {
        duration: 5000,
      });
    });

    form.resetForm('');
  };

}
