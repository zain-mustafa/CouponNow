import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChooseinterestsService {

  constructor(private http: HttpClient) {}

  onSubmitInterests(customerId: string, interests: string[]) {
    this.http.post('http://localhost:3000/customer/chooseinterests', {customerId, interests})
      .subscribe(response => {
        console.log(response);
      });
  }
}
