import { Component, OnInit } from '@angular/core';
import { Business } from 'src/app/_models/business.model';
import { BusinessQuery } from 'src/app/_models/businessquery.model';
import { BusinessService } from 'src/app/_services/business.service';
import { Subscription } from 'rxjs';
import { BusinessOwner } from 'src/app/_models/businessowner.model';

@Component({
  selector: 'app-businesslist',
  templateUrl: './businesslist.component.html',
  styleUrls: ['./businesslist.component.css']
})
export class BusinesslistComponent implements OnInit {
  business: Business;
  businesslist: Business[] = [];
  private businessSubs: Subscription;

  owneremail: string = localStorage.ownerEmail;
  businessquery: BusinessQuery = {
  owneremail: this.owneremail,
  businessindex: null,
  location: null
  }

  constructor(public businessService: BusinessService) {}

  ngOnInit() {
    this.businessService.getBusinesses(this.businessquery);
    this.businessSubs = this.businessService.getPostsUpdateListener()
    .subscribe((business: Business[]) => {
      this.businesslist = business;
    });
  }

  // this.owneremail
  /*
  getBusinesses(): void {
   this.businessService.getBusinesses()
   .subscribe(response => businesslist => this.businesslist = businesslist);
  }
  */
}
