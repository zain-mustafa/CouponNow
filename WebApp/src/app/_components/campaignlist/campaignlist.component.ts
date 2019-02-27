import { Component, OnInit, OnDestroy } from '@angular/core';
import { CampaginService } from 'src/app/_services/campagin.service';
import { Campaign } from 'src/app/_models/campaign.model';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-campaignlist',
  templateUrl: './campaignlist.component.html',
  styleUrls: ['./campaignlist.component.css']
})
export class CampaignlistComponent implements OnInit, OnDestroy {

  public campaigns: Campaign[] = [];
  private campaingSubs: Subscription;
  imagePath;
  constructor(private _sanitizer: DomSanitizer, public campaignService: CampaginService) { }

  ngOnInit() {
    this.campaignService.getCampaigns();
    this.campaingSubs = this.campaignService.getPostsUpdateListener()
     .subscribe((campaign: Campaign[]) => {
       this.campaigns = campaign;
       this.campaigns.forEach(element => {
         if(element.image !== '' ) {
          element.image = this._sanitizer.bypassSecurityTrustResourceUrl(element.image);
         }
       });
     });
   }

  onDelete(event: string) {
    console.log(event);
    this.campaignService.deleteCampaign(event);
  }


  ngOnDestroy() {
    this.campaingSubs.unsubscribe();
  }

}
