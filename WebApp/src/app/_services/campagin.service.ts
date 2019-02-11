import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Campaign } from '../_models/campaign.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CampaginService {

  private campaigns: Campaign[] = [];
  campaign: Campaign;
  private campaignsUpdated = new Subject<Campaign[]>();

  constructor(private http: HttpClient, public router: Router, public dataService: DataService) {}

  onCreate(campaign: Campaign) {
     this.http.post('http://localhost:3000/campaign/add', campaign)
      .subscribe((response) => {
        // TO DO: assign model campaignID from reponse._id
        this.campaign = response['result'];
        // console.log('onCreate' , this.campaign);
        this.campaign._id =  response['campaignID'];
        console.log('Response ID ', this.campaign._id);
        this.campaigns.push(this.campaign);
        this.campaignsUpdated.next([...this.campaigns]);
        this.router.navigate(['/ownerlanding']);
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

  deleteCampaign(campaignID: string) {
    this.http.delete('http://localhost:3000/campaign/list/' + campaignID)
      .subscribe(() => {
        const updatedCampaign = this.campaigns.filter(post => this.campaign._id !== campaignID);
        this.campaigns = updatedCampaign;
        this.campaignsUpdated.next([...this.campaigns]);
      });
  }

}
