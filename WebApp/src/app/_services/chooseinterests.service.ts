import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChooseinterestsService {

  constructor(private http: HttpClient) {}

  getCustomerInterests(customerToken: string) {
    return this.http.post('http://localhost:3000/customer/getcustomerinterests', {customerToken: customerToken});
  }

  onSubmitInterests(customerToken: string, interests: string[]) {
    this.http.post('http://localhost:3000/customer/chooseinterests', {customerToken: customerToken, interests: interests})
      .subscribe(response => {
        console.log(response);
      });
  }
}
