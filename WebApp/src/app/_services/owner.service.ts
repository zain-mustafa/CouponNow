import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusinessOwner } from '../_models/businessowner.model';
import { LoginCred } from '../_models/logincred.model';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class OwnerService {

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
      .pipe(map((response: Response) => response));
  }
}
