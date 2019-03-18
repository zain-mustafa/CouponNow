import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChooseinterestsService {

  constructor(private http: HttpClient) {}

  baseURL = environment.baseUrl;

  // getCustomerInterests(customerToken: string) {
  //   return this.http.post(this.baseURL + '/customer/getcustomerinterests', {customerToken: customerToken});
  // }

  // onSubmitInterests(customerToken: string, interests: string[]) {
  //   this.http.post(this.baseURL + '/customer/chooseinterests', {customerToken: customerToken, interests: interests})
  //     .subscribe(response => {
  //       console.log(response);
  //     });
  // }

  onSaveInterests(customerEmail: String, selectedInterests: String[]): Observable<any> {
    return this.http.post(this.baseURL + '/customer/savecustomerinterests', {customerEmail: customerEmail, interests: selectedInterests})
      .pipe(map(response => {
        return response;
      }));
  }
}
