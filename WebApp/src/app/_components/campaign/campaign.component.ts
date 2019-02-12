import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { SearchedBusiness } from 'src/app/_models/searchedBusiness.model';
import { Campaign } from 'src/app/_models/campaign.model';
import { CampaginService } from 'src/app/_services/campagin.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})

export class CampaignComponent implements OnInit {

  gottemlocations = [];
  minDate = new Date();
  maxDate = new Date(2050, 0, 1);
  private mode = 'create';
  private campaignID: string;

  business: Array<SearchedBusiness> = [
    { name: 'business-0', locations: ['Mumbai', 'Lahore', 'Location']},
    { name: 'business-1', locations: ['location-1', 'location-11', 'location-12']},
    { name: 'business-2', locations: ['location-2', 'location-21', 'location-22']}
    ];

  campaign: Campaign = {
    _id: null,
    name: '',
    business: '',
    location: [''],
    startDate:  '',
    endDate: '',
    maxQty: null
  };

  constructor(public campaignService: CampaginService, public route: ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.minDate);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        // console.log(paramMap.get('_id'));
        this.mode = 'edit';
        this.campaignID = paramMap.get('_id');
        this.campaignService.getCampaign(this.campaignID).subscribe(campaignData => {
        console.log(campaignData);
        this.campaign = {
          _id: this.campaignID,
          name: campaignData.name,
          business: campaignData.business,
          location: campaignData.location,
          startDate: campaignData.startDate,
          endDate: campaignData.endDate,
          maxQty: campaignData.maxQty };
        });
      } else {
        this.mode = 'create';
        this.campaignID = null;
      }
    });
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
    if (this.mode === 'create') {
      this.campaign = {
        _id: '',
        name: form.value.campaignName,
        business: form.value.business,
        location: form.value.locations,
        startDate: form.value.startDate,
        endDate: form.value.endDate,
        maxQty: form.value.maxQty
      };
      console.log(this.campaign);
      this.campaignService.onCreate(this.campaign);
    } else {
        this.campaignService.updateCampaign(this.campaign);
    }
    form.resetForm('');
  }
}
