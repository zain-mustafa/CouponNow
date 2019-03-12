import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChooseinterestsService {

  constructor(private http: HttpClient) {}

  baseURL = environment.baseUrl;

  getCustomerInterests(customerToken: string) {
    return this.http.post(this.baseURL + '/customer/getcustomerinterests', {customerToken: customerToken});
  }

  onSubmitInterests(customerToken: string, interests: string[]) {
    this.http.post(this.baseURL + '/customer/chooseinterests', {customerToken: customerToken, interests: interests})
      .subscribe(response => {
        console.log(response);
      });
  }
}
