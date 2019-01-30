import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './_components/login/login.component';
import { HomepageComponent } from './_components/homepage/homepage.component';
import { CustomersignupComponent } from './_components/customersignup/customersignup.component';
import { OwnersignupComponent } from './_components/ownersignup/ownersignup.component';
import { OwnerlandingComponent } from './_components/ownerlanding/ownerlanding.component';
import { AuthGuardService as AuthGuard } from './_services/auth-guard.service';
import { CampaignComponent } from './_components/campaign/campaign.component';
import { CampaignlistComponent } from './_components/campaignlist/campaignlist.component';

// Setting up the routes for difference links
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent  },
  { path: 'customersignup', component: CustomersignupComponent},
  { path: 'ownersignup', component: OwnersignupComponent},
  { path: 'ownerlanding', component: OwnerlandingComponent, canActivate: [AuthGuard]},
  { path: 'campaign', component: CampaignComponent, canActivate: [AuthGuard]},
  { path: 'campaign/list', component: CampaignlistComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
