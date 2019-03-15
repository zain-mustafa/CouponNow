import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators, NgForm, FormControl} from '@angular/forms';
import { Business } from 'src/app/_models/business.model';
import { BusinessService } from 'src/app/_services/business.service';
import { BusinessQuery } from 'src/app/_models/businessquery.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  business: Business = {
    _id: null,
    businessname: '',
    licensenum: '',
    locations: [],
  }

  newbusiness: BusinessQuery = {
    owneremail: '',
    businessindex: null,
    business: this.business,
    locationindex: null,
    location: null,
  };
  form: FormGroup;
  public mode = 'Add';
  private businessID: string;
  editBusiness: any;
  businesslist: Business[] = [];

  constructor(public businessService: BusinessService, public route: ActivatedRoute,
    public snackBar: MatSnackBar, public router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'businessname': new FormControl(null, {validators: [Validators.required]}),
      'licensenum': new FormControl(null, {validators: [Validators.required]}),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        // console.log(paramMap.get('_id'));
        this.mode = 'Update';
        this.businessID = paramMap.get('_id');
        // console.log("getCampaign", this.campaignService.getCampaign(this.campaignID));
        this.editBusiness = this.businessService.getBusiness(this.businessID);
        //console.log(this.editBusiness);

        this.business = {
          _id: this.editBusiness._id,
          businessname: this.editBusiness.businessname,
          licensenum: this.editBusiness.licensenum,
          locations: null,
        };

          this.form.setValue({
            'businessname': this.business.businessname,
            'licensenum':  this.business.licensenum,
          });
      } else {
        this.mode = 'Add';
        this.businessID = null;
      }
    });
  }

  addBusiness() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'Add'){
    //console.log('Create mode');
    //console.log(this.form.value);

    this.business = {
      _id: null,
      businessname: this.form.value.businessname,
      licensenum: this.form.value.licensenum,
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
      businessindex: null,
      business: this.business,
      locationindex: null,
      location: null
    };

    //console.log(this.business);

    this.businessService.addBusiness(this.newbusiness)
    .subscribe(response => {
      console.log('Response ' + response.message);
      this.snackBar.open(response.message, 'Dismiss', {
        duration: 5000,
      });

      this.form.reset();
      this.router.navigate(['/ownerlanding']);
    }, error => {
      this.snackBar.open('Error. Update business failed', 'Dismiss', {
        duration: 5000,
      });
    });
    this.router.navigate(['/ownerlanding']);
  } else {
    this.business = {
      _id: this.editBusiness._id,
      businessname: this.form.value.businessname,
      licensenum: this.form.value.licensenum,
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
      businessindex: this.business._id,
      business: this.business,
      locationindex: null,
      location: null
    };
    //console.log(this.newbusiness);
    this.businessService.updateBusiness(this.newbusiness)
    .subscribe(response => {
      console.log('Response ' + response.message);
      this.snackBar.open(response.message, 'Dismiss', {
        duration: 5000,
      });
      this.router.navigate(['/ownerlanding']);
    }, error => {
      this.snackBar.open('Error. Update business failed', 'Dismiss', {
        duration: 5000,
      });
    });
  }
   this.form.reset();
  }
}
