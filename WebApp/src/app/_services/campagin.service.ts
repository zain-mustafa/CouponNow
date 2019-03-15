import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Campaign } from '../_models/campaign.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import {Observable} from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CampaginService {

  baseURL = environment.baseUrl;

  private campaigns: Campaign[] = [];
  campaign: Campaign;
  private campaignsUpdated = new Subject<Campaign[]>();

  constructor(private http: HttpClient, public router: Router, public dataService: DataService, private _sanitizer: DomSanitizer) {}

  onCreate(campaign: Campaign) {
    console.log('onCreate Tag', campaign.tag);
     this.http.post(this.baseURL + '/campaign/add', campaign)
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

  getCampaigns(email: String) {
    this.http.get(this.baseURL + '/campaign/list/' + email)
      .subscribe((response) => {
        // console.log('response' , response);
        this.campaigns = response['result'];
        // console.log('getCampaigns' , this.campaigns);
        this.campaigns.forEach(element => {
          if (element.image !== '' ) {
           element.image = this._sanitizer.bypassSecurityTrustResourceUrl(element.image);
          }
        });
        this.campaignsUpdated.next([...this.campaigns]);
      });
  }

  getPostsUpdateListener() {
    return this.campaignsUpdated.asObservable();
  }

  deleteCampaign(campaignID: string): Observable<Campaign[]> {
    return this.http.delete(this.baseURL + '/campaign/list/' + campaignID)
      .pipe(map(() => {
        // const updatedCampaign = this.campaigns.filter(post => this.campaign._id !== campaignID);
        // this.campaigns = updatedCampaign;
        // this.campaignsUpdated.next([...this.campaigns]);
        const index = this.campaigns.findIndex((ind) => ind['_id'] === campaignID);
        this.campaigns.splice(+index, 1);
        // console.log('CampaignDelete', this.campaigns);
        return this.campaigns;
      }));
  }

  getCampaign(_id: string) {
    return this.campaigns.find(campaign => campaign._id === _id);
  }

  updateCampaign(campaign: Campaign) {
    this.http.put(this.baseURL + '/campaign/edit/' + campaign._id, campaign)
      .subscribe(response => {
        const campaignsUpdated = [...this.campaigns];
        const oldCampaigntIndex = campaignsUpdated.findIndex(p => p._id === campaign._id);
        campaignsUpdated[oldCampaigntIndex] = campaign;
        this.campaigns = campaignsUpdated;
        this.campaignsUpdated.next([...this.campaigns]);
        this.router.navigate(['/owner']);
      });
  }
}
