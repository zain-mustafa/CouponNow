import { Component, OnInit, OnDestroy } from '@angular/core';
import { CampaginService } from 'src/app/_services/campagin.service';
import { Campaign } from 'src/app/_models/campaign.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-campaignlist',
  templateUrl: './campaignlist.component.html',
  styleUrls: ['./campaignlist.component.css']
})
export class CampaignlistComponent implements OnInit, OnDestroy {

  public campaigns: Campaign[] = [];
  private campaingSubs: Subscription;

  constructor(public campaignService: CampaginService) { }

  ngOnInit() {
    this.campaignService.getCampaigns();
    this.campaingSubs = this.campaignService.getPostsUpdateListener()
     .subscribe((campaign: Campaign[]) => {
       console.log(campaign);
       this.campaigns = campaign;
     });
   }

  onDelete(id: string) {
    console.log(id);
    this.campaignService.deleteCampaign(id);
  }


  ngOnDestroy() {
    this.campaingSubs.unsubscribe();
  }

}
