import {Component, OnInit} from '@angular/core';
// import {AbstractControl, FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchedBusiness } from 'src/app/_models/searchedBusiness.model';
import { Campaign } from 'src/app/_models/campaign.model';
import { CampaginService } from 'src/app/_services/campagin.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Subscription } from 'rxjs';
import { BusinessService } from 'src/app/_services/business.service';
import { Business } from 'src/app/_models/business.model';


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
  editCampaign: any;
  selectedFile: null;
  form: FormGroup;
  businessList: Business[] = [];
  image: string;

  // business: Array<SearchedBusiness> = [
  //   { name: 'business-0', locations: ['Mumbai', 'Lahore', 'Location']},
  //   { name: 'business-1', locations: ['location-1', 'location-11', 'location-12']},
  //   { name: 'business-2', locations: ['location-2', 'location-21', 'location-22']}
  //   ];

  campaign: Campaign = {
    _id: null,
    name: '',
    business: '',
    location: [''],
    startDate:  '',
    endDate: '',
    maxQty: null
  };

  constructor(public campaignService: CampaginService, public route: ActivatedRoute, public businessService: BusinessService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, {validators: [Validators.required]}),
      'business': new FormControl(null, {validators: [Validators.required]}),
      // 'location': new FormControl(null, {validators: [Validators.required]}),
      'location': new FormControl(null, null),
      'maxQty': new FormControl(null, {validators: [Validators.required]}),
      'startDate': new FormControl(null, {validators: [Validators.required]}),
      'endDate': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {validators: [Validators.required]})
    });

    this.businessList = this.businessService.getBusinesslist();
    // console.log('businessList', this.businessList);

    // console.log(this.minDate);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        // console.log(paramMap.get('_id'));
        this.mode = 'edit';
        this.campaignID = paramMap.get('_id');
        // console.log("getCampaign", this.campaignService.getCampaign(this.campaignID));
        this.editCampaign = this.campaignService.getCampaign(this.campaignID);
        console.log(this.editCampaign);

        this.campaign = {
          _id: this.editCampaign._id,
          name: this.editCampaign.name,
          business: this.editCampaign.business,
          location: [this.editCampaign.location],
          startDate: this.editCampaign.startDate,
          endDate: this.editCampaign.endDate,
          maxQty: this.editCampaign.maxQty };

          this.form.setValue({
            'name': this.campaign.name,
            'business':  this.campaign.business,
            'location': this.campaign.location,
            'maxQty': this.campaign.maxQty,
            'startDate': this.campaign.startDate,
            'endDate': this.campaign.endDate
          });
      } else {
        this.mode = 'create';
        this.campaignID = null;
      }
    });
  }

  public onChangeBusiness(event): void {
    const businessName = event.target.value;
    console.log('businessName' + businessName);
    this.gottemlocations = [];
    console.log(businessName);
    this.businessList.forEach(business => {
      if ( businessName === business.businessname ) {
        business.locations.forEach(locations => {
          this.gottemlocations.push({'name': locations.streetname});
        });
        console.log(this.gottemlocations);
      }
    });
  }

  ImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.image = <string>reader.result;
    };
    reader.readAsDataURL(file);
  }

  onCreateCampaign() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.campaign = {
        _id: '',
        name: this.form.value.campaignName,
        business: this.form.value.business,
        location: this.form.value.locations,
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate,
        maxQty: this.form.value.maxQty
      };
      console.log(this.campaign);
      this.campaignService.onCreate(this.campaign);
    } else {
        this.campaignService.updateCampaign(this.campaign);
    }
    this.form.reset();
  }
}
