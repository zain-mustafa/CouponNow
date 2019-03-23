import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerService } from './customer.service';


@Injectable({
  providedIn: 'root'
})
export class ChooseinterestsService {

  constructor(private http: HttpClient, public customerInfo: CustomerService) { }

  baseURL = environment.baseUrl;

  private interestsUpdated = new Subject<any[]>();

  onSaveInterests(customerEmail: String, selectedInterests: String[]): Observable<any> {
    return this.http.post(this.baseURL + '/customer/savecustomerinterests', {customerEmail: customerEmail, interests: selectedInterests})
      .pipe(map(response => {
        return response;
      }));
  }

  onAppendInterests(customerEmail: String, selectedInterests: any[]): Observable<any> {
    return this.http.post(this.baseURL + '/customer/appendcustomerinterests', {customerEmail: customerEmail, interests: selectedInterests})
      .pipe(map(response => {
        return response;
      }));
  }

  onDeleteInterests(customerEmail: String, interestToDelete: String): Observable<any> {
    console.log(customerEmail);
    console.log(interestToDelete);
    return this.http.delete(this.baseURL + '/customer/deleteinterest/' + customerEmail + '/' + interestToDelete)
      .pipe(map((response) => {
        console.log(response);
        this.customerInfo.customerInfo.interests = this.customerInfo.customerInfo.interests.filter(interest => {
          return interest.interest !== interestToDelete;
        });
        console.log(this.customerInfo.customerInfo.interests);
        return response;
        // const updatedCampaign = this.campaigns.filter(post => this.campaign._id !== campaignID);
        // this.campaigns = updatedCampaign;
        // this.campaignsUpdated.next([...this.campaigns]);
      }));
  }

  getPostsUpdateListener() {
    return this.interestsUpdated.asObservable();
  }

}
