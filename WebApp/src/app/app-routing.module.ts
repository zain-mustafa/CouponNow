import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './_components/login/login.component';
import { HomepageComponent } from './_components/homepage/homepage.component';
import { CustomersignupComponent } from './_components/customersignup/customersignup.component';
import { OwnersignupComponent } from './_components/ownersignup/ownersignup.component';
import { OwnerlandingComponent } from './_components/ownerlanding/ownerlanding.component';
import { AuthGuardService as OwnerAuthGuard } from './_services/owner-auth-guard.service';
import { AuthGuardService as CustomerAuthGaurd } from './_services/customer-auth-gaurd.service';
import { CampaignComponent } from './_components/campaign/campaign.component';
import { CampaignlistComponent } from './_components/campaignlist/campaignlist.component';
import { BusinessComponent } from './_components/business/business.component';
import { BusinesslistComponent } from './_components/businesslist/businesslist.component';
import { ChooseInterestsComponent } from './_components/chooseinterests/choose-interests.component';
import { OwnerProfileComponent } from './_components/owner-profile/owner-profile.component';
import { CustomerprofileComponent } from './_components/customerprofile/customerprofile.component';
import { SignupComponent } from './_components/signup/signup.component';
import { CustomersetupComponent } from './_components/customersetup/customersetup.component';
import { AddLocationComponent } from './_components/addlocation/addlocation.component';

// Setting up the routes for difference links
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent  },
  { path: 'signup', component: SignupComponent  },
  { path: 'customersignup', component: CustomersignupComponent},
  { path: 'ownersignup', component: OwnersignupComponent},
  { path: 'ownerlanding', component: OwnerlandingComponent, canActivate: [OwnerAuthGuard]},
  { path: 'campaign', component: CampaignComponent, canActivate: [OwnerAuthGuard]},
  { path: 'ownerlanding/campaign/edit/:_id', component: CampaignComponent },
  { path: 'campaign/list', component: CampaignlistComponent, canActivate: [OwnerAuthGuard]},
  { path: 'business', component: BusinessComponent, canActivate: [OwnerAuthGuard]},
  { path: 'businesslist', component: BusinesslistComponent, canActivate: [OwnerAuthGuard]},
  { path: 'chooseinterests', component: ChooseInterestsComponent, canActivate: [CustomerAuthGaurd]},
  { path: 'campaign/list', component: CampaignlistComponent, canActivate: [OwnerAuthGuard]},
  { path: 'ownerprofile', component: OwnerProfileComponent, canActivate: [OwnerAuthGuard]},
  { path: 'customerprofile', component: CustomerprofileComponent, canActivate: [CustomerAuthGaurd] },
  { path: 'firsttime', component: CustomersetupComponent, canActivate: [CustomerAuthGaurd] },
  { path: 'addlocation', component: AddLocationComponent, canActivate: [OwnerAuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
