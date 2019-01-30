import { Component, OnInit } from '@angular/core';
import { CampaginService } from 'src/app/_services/campagin.service';
import { Campaign } from 'src/app/_models/campaign.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-campaignlist',
  templateUrl: './campaignlist.component.html',
  styleUrls: ['./campaignlist.component.css']
})
export class CampaignlistComponent implements OnInit {

  campaigns: Campaign[] = [];
  private campaingSubs: Subscription;

  constructor(public campaignService: CampaginService) { }

  ngOnInit() {
    this.campaignService.getCampaigns();
    this.campaingSubs = this.campaignService.getPostsUpdateListener()
     .subscribe((campaign: Campaign[]) => {
       this.campaigns = campaign;
     });
   }

  onDelete(postId: string) {
    // this.campaignService.deletePost();
  }

}
