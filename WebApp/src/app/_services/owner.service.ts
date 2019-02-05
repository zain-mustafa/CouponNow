import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusinessOwner } from '../_models/businessowner.model';
import { LoginCred } from '../_models/logincred.model';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class OwnerService {

  private ownerInfo: any = {
    email: '',
    phone: '',
    firstname: '',
    lastname: ''
  };

  // Adds the http module to the service
  constructor(private http: HttpClient) {}

  onSignUpOwner(owner: BusinessOwner) {
     // API call when the owner signs up
    this.http.post('http://localhost:3000/owner/signup', owner)
      .subscribe(response => {
        // displays the response recieved on the browser console.
        console.log(response);
      });
  }

  loginOwner( loginCred: LoginCred ): Observable<any> {
    // API call when the customer logs in
    return this.http.post('http://localhost:3000/owner/login', loginCred)
      .pipe(map((response: Response) => {
        this.setOwnerInfo(response);
        return response;
      }));
  }

  getOwnerInfo() {
    return this.ownerInfo;
  }

  setOwnerInfo(response: Response) {
    this.ownerInfo.email = response['email'];
    this.ownerInfo.phone = response['phone'];
    this.ownerInfo.firstname = response['firstname'];
    this.ownerInfo.lastname = response['lastname'];
  }
}
