import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Business } from '../_models/business.model';
import { NewBusiness } from '../_models/newbusiness.model';
import {Observable, of} from 'rxjs';
import { BusinessOwner } from '../_models/businessowner.model';
import { BusinessQuery } from '../_models/businessquery.model';
import { BusinessLocation} from '../_models/businesslocation.model'

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) {}

  private businessesUpdated = new Subject<Business[]>();
  private businesslist: Business [] = [];
  business: Business;

  addBusiness(newbusiness: NewBusiness) {
     this.http.post('http://localhost:3000/owner/addbusiness', newbusiness)
      .subscribe((response) => {
        console.log('response', response);
      });
  }

  getBusinesses(businessquery: BusinessQuery) {
    this.http.post('http://localhost:3000/owner/listbusiness', businessquery)
      .subscribe((response) => {
        console.log('businesslist' , response);
        this.businesslist = response['businesslist'];
        console.log('getBusinesses' , this.businesslist);
       this.businessesUpdated.next([...this.businesslist]);
      });
    }

    getPostsUpdateListener() {
      return this.businessesUpdated.asObservable();
    }

  addLocation(businessquery: BusinessQuery){
    this.http.post('http://localhost:3000/owner/addlocation', businessquery)
    .subscribe((response) => {
        console.log('response', response);
      });
  }

}
