import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusinessOwner } from '../_models/businessowner.model';
import { LoginCred } from '../_models/logincred.model';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class OwnerService {

  baseURL = environment.baseUrl;

  private ownerInfo: any = {
    email: '',
    phone: '',
    firstname: '',
    lastname: ''
  };

  // Adds the http module to the service
  constructor(private http: HttpClient) {}

  onSignUpOwner(owner: BusinessOwner): Observable<any> {
     // API call when the owner signs up
    return this.http.post(this.baseURL + '/owner/signup', owner)
      .pipe(map(response => {
        // displays the response recieved on the browser console.
        console.log(response);
        return response;
      }));
  }

  // Login has been merged and the request is sent through the customer.service.ts

  // loginOwner( loginCred: LoginCred ): Observable<any> {
  //   // API call when the customer logs in
  //   return this.http.post(this.baseURL + '/owner/login', loginCred)
  //     .pipe(map((response: Response) => {
  //       this.setOwnerInfo(response);
  //       return response;
  //     }));
  // }

  // getOwnerInfo() {
  //   return this.ownerInfo;
  // }

  // setOwnerInfo(response: any) {
  //   this.ownerInfo.email = response['email'];
  //   this.ownerInfo.phone = response['phone'];
  //   this.ownerInfo.firstname = response['firstname'];
  //   this.ownerInfo.lastname = response['lastname'];
  // }
}
