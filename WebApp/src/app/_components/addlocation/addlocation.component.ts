import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { Business } from 'src/app/_models/business.model';
import { BusinessLocation } from 'src/app/_models/businesslocation.model';
import { BusinessService } from 'src/app/_services/business.service';
import { BusinessQuery } from 'src/app/_models/businessquery.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.component.html',
  styleUrls: ['./addlocation.component.scss']
})
export class AddLocationComponent implements OnInit {

  businessID: string;
  location: BusinessLocation;
  owneremail = localStorage.ownerEmail;
  businessquery: BusinessQuery = {
    owneremail: this.owneremail,
    businessindex: null,
    business: null,
    locationindex: null,
    location: null
  }
  business: Business;
  businesslist: Business[] = [];
  private businessSubs : Subscription;
  form: FormGroup;
  public mode = 'Add';
  locationID: string;
  editLocation: any;

  constructor(public businessService: BusinessService, public snackBar: MatSnackBar, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    //console.log(this.owneremail);
    this.businessService.getBusinesses(this.businessquery);
    this.businessSubs = this.businessService.getPostsUpdateListener()
    .subscribe((business: Business[]) => {
      this.businesslist = business;

      this.route.paramMap.subscribe((params: ParamMap) => {
        /*
        console.log('subscribe');
        console.log(params.get('id1'));
        console.log(params.get('id2'));
        */

        if (params.has('id1') && params.has('id2')) {

          this.mode = 'Update';
          this.businessID = params.get('id1');
          this.locationID = params.get('id2');
          console.log('Business ID ' + this.businessID);
          console.log('Location ID ' + this.locationID);

          //this.business = this.businessService.getBusiness(this.businessID);
          this.business = this.businesslist.find(business => business._id === this.businessID);
          //console.log('Business ' + this.business.businessname);

          this.editLocation = this.business.locations.find(location => location._id === this.locationID);
          //console.log('Location' + this.editLocation);

          this.location = {

            _id: this.editLocation._id,
            streetnum: this.editLocation.streetnum,
            streetname: this.editLocation.streetname,
            city: this.editLocation.city,
            postalcode: this.editLocation.postalcode,
            lon: null,
            lat: null,
          };

            this.form.setValue({
              'business': this.business,
              'streetnum': this.location.streetnum,
              'streetname': this.location.streetname,
              'city': this.location.city,
              'postalcode':  this.location.postalcode,
            });
        } else {
          this.mode = 'Add';
          this.locationID = null;
        }
      });
    })

    this.form = new FormGroup({
      'business': new FormControl,
      'streetnum': new FormControl(null, {validators: [Validators.required]}),
      'streetname': new FormControl(null, {validators: [Validators.required]}),
      'city': new FormControl(null, {validators: [Validators.required]}),
      'postalcode': new FormControl(null, {validators: [Validators.required]}),
    });
    /*
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log('subscribe');
      console.log(params.get('id1'));
      console.log(params.get('id2'));

<<<<<<< HEAD
=======

>>>>>>> master
      if (params.has('id1') && params.has('id2')) {

        this.mode = 'edit';
        this.businessID = params.get('id1');
        this.locationID = params.get('id2');
        console.log('Business ID ' + this.businessID);

        //this.business = this.businessService.getBusiness(this.businessID);
        this.business = this.businesslist.find(business => business._id === this.businessID);
        console.log('Business ' + this.business);
        this.editLocation = this.business.locations.find(location => location._id === this.locationID);
        console.log('Location' + this.editLocation);

        this.location = {

          _id: this.editLocation._id,
          streetnum: this.editLocation.streetnum,
          streetname: this.editLocation.streetname,
          city: this.editLocation.city,
          postalcode: this.editLocation.postalcode,
          lon: null,
          lat: null,
        };

          this.form.setValue({
            'business': this.business,
            'streetnum': this.location.streetnum,
            'streetname': this.location.streetname,
            'city': this.location.city,
            'postalcode':  this.location.postalcode,
          });
      } else {
        this.mode = 'create';
        this.locationID = null;
      }
    });
    */

  }

  onChangeBusiness(businessname) {
    //console.log(businessname);
    }

  addLocation() {

    if (this.form.invalid) {
      /*
      console.log(this.mode);
      console.log(this.form.value);
      console.log('Form Invalid');
      */
      return;
    }

    if (this.mode === 'Add') {
      //console.log('Create mode');
      //console.log(this.form.value);

      this.location = {
      _id: null,
      streetnum: this.form.value.streetnum,
      streetname: this.form.value.streetname,
      city: this.form.value.city,
      postalcode: this.form.value.postalcode,
      lon: null,
      lat: null,
      }
      this.businessID = this.form.value.business._id;
      /*
      console.log(this.businessID);
      console.log(this.businessquery);
      */
      this.businessService.getGeoLocation(this.location).subscribe(location => {

        this.businessquery = {
          owneremail: this.owneremail,
          businessindex: this.businessID,
          business: null,
          locationindex: null,
          location: this.location
        }
        //console.log(this.businessquery);

        this.businessService.addLocation(this.businessquery).subscribe(response => {
          console.log("Addlocatiom component response" + response.message);
          this.snackBar.open(response.message, 'Dismiss', {
            duration: 5000,
          });
          this.form.reset();
          this.router.navigate(['/ownerlanding']);
        }, error => {
          this.snackBar.open('Error. Add location failed', 'Dismiss', {
            duration: 5000,
          });
        });
      }, error => {
          this.snackBar.open('Error. Geocode failed', 'Dismiss', {
            duration: 5000,
          });
        });

  } else {
    // console.log('Update Mode');
    this.location = {
      _id: this.locationID,
      streetnum: this.form.value.streetnum,
      streetname: this.form.value.streetname,
      city: this.form.value.city,
      postalcode: this.form.value.postalcode,
      lon: null,
      lat: null,
      }
      this.businessID = this.form.value.business._id;

      this.businessService.getGeoLocation(this.location).subscribe(location => {

        this.businessquery = {
          owneremail: this.owneremail,
          businessindex: this.businessID,
          business: null,
          locationindex: this.locationID,
          location: this.location
        }
        // console.log(this.businessquery);

        this.businessService.updateLocation(this.businessquery).subscribe(response => {
          console.log("Addlocatiom component response" + response.message);
          this.snackBar.open(response.message, 'Dismiss', {
            duration: 5000,
          });
          this.form.reset();
          this.router.navigate(['/ownerlanding']);
        }, error => {
          this.snackBar.open('Error. Update location failed', 'Dismiss', {
            duration: 5000,
          });
        });
      }, error => {
          this.snackBar.open('Error. Geocode failed', 'Dismiss', {
            duration: 5000,
          });
        });

  }

    // this.form.reset();
  };

}
