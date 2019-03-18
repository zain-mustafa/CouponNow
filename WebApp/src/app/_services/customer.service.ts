import { Injectable } from '@angular/core';
import { Customer } from '../_models/customer.model';
import { HttpClient } from '@angular/common/http';
import { LoginCred } from '../_models/logincred.model';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataService } from 'src/app/_services/data.service';
import {CustomerFirstTimeSetup} from '../_models/customerfirsttimesetup.model';
import { environment } from 'src/environments/environment';


@Injectable({providedIn: 'root'})
export class CustomerService {

  baseURL = environment.baseUrl;

  public customerInfo: any = {
    email: '',
    firstname: '',
    lastname: '',
    dateOfBirth: '',
    gender: '',
    occupation: '',
    couponRadius: '',
    interests: []
  };

  // Adds the http module to the service
  constructor(private http: HttpClient,  public dataService: DataService) {}

  onSignUpCustomer(customer: Customer): Observable<any> {
    // API call when the customer signs up
    return this.http.post(this.baseURL + '/customer/signup', customer)
      .pipe(
        map(response => {
                  // displays the response recieved on the browser console.
        console.log(response);
        return response;
        })
        );
  }

  loginCustomer( loginCred: LoginCred ): Observable<any> {
    // API call when the customer logs in
    return this.http.post(this.baseURL + '/customer/login', loginCred)
      .pipe(map((response: Response) => {
        this.setCustomerInfo(response);
        return response;
      }));
  }

  getCustomerInfo() {
    return this.customerInfo;
  }

  updateCustomerInfo(info) {
    for (const key in info) {
      if (this.customerInfo.hasOwnProperty(key)) {
        this.customerInfo[key] = info[key];
      }
    }
  }

  setCustomerInfo(response: Response) {
    this.customerInfo.email = response['email'];
    this.customerInfo.firstname = response['firstname'];
    this.customerInfo.lastname = response['lastname'];
    this.customerInfo.dateOfBirth = response['dateOfBirth'];
    this.customerInfo.gender = response['gender'];
    this.customerInfo.occupation = response['occupation'];
    this.customerInfo.couponRadius = response['couponRadius'];
    this.customerInfo.interests = response['interests'];
  }

  setLoginSessionVariables(response: Response) {
    localStorage.setItem('customerToken', response['token']);
    localStorage.setItem('customerEmail', response['email']);
    this.dataService.setLogin(true);
    this.dataService.setCustomer(true);
  }

  saveFirstTimeSetup(customerInfo: CustomerFirstTimeSetup) {
    console.log(customerInfo);
    return this.http.post(this.baseURL + '/customer/savecustomersetupinfo', customerInfo)
      .pipe(map(response => {
        console.log(response);
        return response;
      }));
  }
}
