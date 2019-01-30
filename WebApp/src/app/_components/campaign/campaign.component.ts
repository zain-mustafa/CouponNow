import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { SearchedBusiness } from 'src/app/_models/searchedBusiness.model';
import { Campaign } from 'src/app/_models/campaign.model';
import { CampaginService } from 'src/app/_services/campagin.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})

export class CampaignComponent implements OnInit {

  gottemlocations = [];
  minDate = new Date();
  maxDate = new Date(2050, 0, 1);

  business: Array<SearchedBusiness> = [
    { name: 'business-0', locations: ['Mumbai', 'Lahore', 'Location']},
    { name: 'business-1', locations: ['location-1', 'location-11', 'location-12']},
    { name: 'business-2', locations: ['location-2', 'location-21', 'location-22']}
    ];

  campaign: Campaign = {
    name: '',
    business: '',
    location: [''],
    startDate:  '',
    endDate: '',
    maxQty: null
  };

  constructor(public campaignService: CampaginService) { }

  ngOnInit() {
    console.log(this.minDate);
  }

  onChangeBusiness(businessName) {
    this.gottemlocations = [];
    this.business.forEach(business => {
      if ( businessName === business.name ) {
        business.locations.forEach(locations => {
          this.gottemlocations.push({'name': locations});
        });
        console.log(this.gottemlocations);
      }
    });
  }

  onCreateCampaign(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.campaign = {
      name: form.value.campaignName,
      business: form.value.business,
      location: form.value.locations,
      startDate: form.value.startDate,
      endDate: form.value.endDate,
      maxQty: form.value.maxQty
    };

    console.log(this.campaign);

    this.campaignService.onCreate(this.campaign);

    form.resetForm('');
  }
}
