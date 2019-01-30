import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Campaign } from '../_models/campaign.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CampaginService {

  private campaigns: Campaign[] = [];
  campaign: Campaign;
  private campaignsUpdated = new Subject<Campaign[]>();

  constructor(private http: HttpClient) {}

  onCreate(campaign: Campaign) {
     this.http.post('http://localhost:3000/campaign/add', campaign)
      .subscribe((response) => {

        // TO DO: assign model campaignID from reponse._id
        // const id = response.campaignID;

        // console.log('response' , response);
        this.campaign = response['result'];
        // console.log('onCreate' , this.campaign);
        this.campaigns.push(this.campaign);
      });
  }

  getCampaigns() {
    this.http.get('http://localhost:3000/campaign/list/')
      .subscribe((response) => {
        // console.log('response' , response);
        this.campaigns = response['result'];
        // console.log('getCampaigns' , this.campaigns);
        this.campaignsUpdated.next([...this.campaigns]);
      });
  }

  getPostsUpdateListener() {
    return this.campaignsUpdated.asObservable();
  }

  // getCampaigns() {
  //   this.http.get('http://localhost:3000/campaign/list/')
  //     .subscribe(response => {
  //       // console.log('response' , response);
  //       this.campaigns = response['result'];
  //       // console.log('getCampaigns' , this.campaigns);
  //     });
  // }



}
