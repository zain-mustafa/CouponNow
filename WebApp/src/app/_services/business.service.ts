import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Business } from '../_models/business.model';
import { NewBusiness } from '../_models/newbusiness.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) {}

  private businessesUpdated = new Subject<Business[]>();
  private businesslist: Business [] = [];
  business: Business;

  addBusiness(newbusiness: NewBusiness) {
     this.http.post('http://localhost:3000/owner/addbusiness', newbusiness)
      .subscribe((response) => {
        console.log('response', response);
      });
  }

  getBusinesses() {
    this.http.get('http://localhost:3000/owner/listbusiness')
      .subscribe((response) => {
        console.log('businesslist' , response);
        this.businesslist = response['businesslist'];
        console.log('getCampaigns' , this.businesslist);
       this.businessesUpdated.next([...this.businesslist]);
      });
    }

    getPostsUpdateListener() {
      return this.businessesUpdated.asObservable();
    }
  /*
  getBusinesses() : Observable<Business[]>{
   return this.http.get<Business[]>('http://localhost:3000/owner/listbusiness')
   .pipe(
    tap(_ => console.log('fetched businesses')),
    catchError(this.handleError('getBusinesses', []))
  );
}

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  */
}
