import { Component, OnInit, OnDestroy } from '@angular/core';
import { CampaginService } from 'src/app/_services/campagin.service';
import { Campaign } from 'src/app/_models/campaign.model';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomerService } from 'src/app/_services/customer.service';
@Component({
  selector: 'app-campaignlist',
  templateUrl: './campaignlist.component.html',
  styleUrls: ['./campaignlist.component.css']
})
export class CampaignlistComponent implements OnInit, OnDestroy {

  public campaigns: Campaign[] = [];
  private campaingSubs: Subscription;
  imagePath;
  constructor(private _sanitizer: DomSanitizer, public campaignService: CampaginService,
              public customerInfo: CustomerService) { }

  ngOnInit() {
    this.campaignService.getCampaigns(this.customerInfo.customerInfo.email);
    this.campaingSubs = this.campaignService.getPostsUpdateListener()
     .subscribe((campaign: Campaign[]) => {
       this.campaigns = campaign;
     });
   }

  onDelete(event: string) {
    console.log(event);
    this.campaignService.deleteCampaign(event).subscribe(cammpaigns => this.campaigns = cammpaigns);
  }


  ngOnDestroy() {
    this.campaingSubs.unsubscribe();
  }

}
