import { Component, OnInit } from '@angular/core';
import { Business } from 'src/app/_models/business.model';
import { BusinessService } from 'src/app/_services/business.service';
import { Subscription } from 'rxjs';

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

  constructor(public businessService: BusinessService) {}

  ngOnInit() {
    this.businessService.getBusinesses();
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
