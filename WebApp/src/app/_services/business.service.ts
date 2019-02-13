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

    getBusinesslist() {
      console.log(this.businesslist);
      return this.businesslist;
    }

  addLocation(businessquery: BusinessQuery): Observable<any>{
    let newlocation = businessquery.location;
    //location iq us server url GET https://us1.locationiq.com/v1/search.php?key=YOUR_PRIVATE_TOKEN&q=SEARCH_STRING&format=json
    //API token a9ecf37e7b3555
    const baseUrl = 'https://us1.locationiq.com/v1/search.php?key=';
    let queryString = '';
    const apiToken = 'a9ecf37e7b3555';
    const format = '&format=json&limit=1';
    let completeUrl = '';
    //%20 = space, %2C = ,
    queryString = '&q=SEARCH_' + newlocation.streetnum +'%20'+ newlocation.streetname + '%2C' + newlocation.city + '%2C '+ newlocation.postalcode;

    completeUrl = baseUrl + apiToken + queryString + format;

    return this.http.get(completeUrl)
    .pipe(map((response: Response) => {
        if (response[0].lat < 20 || response[0].lat > 80){
          return {message: 'Geocode Error. Could not get accurate location from address.'};
        } else if (response[0].lon < -150 || response[0].lon > -50){
          return {message: 'Geocode Error. Could not get accurate location from address.'};
        }
        console.log('response', response);
        businessquery.location.lat = response[0].lat;
        businessquery.location.lon = response[0].lon;
        //console.log('lat' + newlocation.lat);
        //console.log('lon' + newlocation.lon);

       this.http.post('http://localhost:3000/owner/addlocation', businessquery)
        .subscribe((response) => {
            console.log('response', response);
            return response;
          })
    }))
  }

}
