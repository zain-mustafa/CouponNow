import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticatedOwner(): boolean {
    const token = localStorage.getItem('ownerToken');
    // Check whether the token is expired and return
    // true or false
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  public isAuthenticatedCustomer(): boolean {
    const token = localStorage.getItem('customerToken');
    // Check whether the token is expired and return
    // true or false
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
