import { Component, OnInit, OnDestroy } from '@angular/core';
import { Business } from 'src/app/_models/business.model';
import { BusinessQuery } from 'src/app/_models/businessquery.model';
import { BusinessService } from 'src/app/_services/business.service';
import { Subscription } from 'rxjs';
import { BusinessOwner } from 'src/app/_models/businessowner.model';
import {MatListModule} from '@angular/material/list';
import { MatSnackBar } from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-businesslist',
  templateUrl: './businesslist.component.html',
  styleUrls: ['./businesslist.component.css']
})
export class BusinesslistComponent implements OnInit, OnDestroy {
  business: Business;
  businesslist: Business[] = [];
  private businessSubs: Subscription;
  businessListLength = false;

  owneremail: string = localStorage.ownerEmail;
  businessquery: BusinessQuery = {
  owneremail: this.owneremail,
  businessindex: null,
  business: null,
  locationindex: null,
  location: null
  };

  constructor(public businessService: BusinessService, public snackBar: MatSnackBar, public router: Router) {}

  ngOnInit() {
    this.businessService.getBusinesses(this.businessquery);
    this.businessSubs = this.businessService.getPostsUpdateListener()
    .subscribe((business: Business[]) => {
      this.businesslist = business;
    });
    this.businessService.getNearbyLocations();
  }

  deleteLocation(event: string){
    // console.log(event);
    let string = event.split(' ');
    // console.log(string[0]);
    // console.log(string[1]);
    let deletequery: BusinessQuery = {
      owneremail: this.owneremail,
      businessindex: string[0],
      business: null,
      locationindex: string[1],
      location: null,

    };
    //console.log(deletequery);

    this.businessService.deleteLocation(deletequery)
    .subscribe(response => {
      // console.log('Response ' + response);
      this.snackBar.open(response.message, 'Dismiss', {
        duration: 5000,
      });
    }, error => {
      this.snackBar.open('Error. Delete location failed', 'Dismiss', {
        duration: 5000,
      });
    });
  }

  deleteBusiness(event: string) {
    let deletequery: BusinessQuery = {
      owneremail: this.owneremail,
      businessindex: event,
      business: null,
      locationindex: null,
      location: null,

    };
    // console.log(deletequery);

    this.businessService.deleteBusiness(deletequery)
    .subscribe(response => {
      this.businesslist = response;
      // console.log('Response ' + response);
      this.snackBar.open('Business Deleted', 'Dismiss', {
        duration: 5000,
      });
    }, error => {
      this.snackBar.open('Error. Delete business failed', 'Dismiss', {
        duration: 5000,
      });
    });
  }

  editBusiness(event: string){
    console.log(event);
    this.router.navigate(['ownerlanding/business/edit/', event]);
  }

  editLocation(event: string){
    //console.log(event);
    let string = event.split(' ');
    //console.log(string[0]);
    //console.log(string[1]);
    this.router.navigate(['ownerlanding/addlocation/edit/', string[0], string[1]]);
  }

  ngOnDestroy() {
    this.businessSubs.unsubscribe();
  }

}
