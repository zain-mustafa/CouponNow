import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatExpansionModule
 } from '@angular/material';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './_components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './_components/homepage/homepage.component';
import { CustomersignupComponent } from './_components/customersignup/customersignup.component';
import { OwnersignupComponent } from './_components/ownersignup/ownersignup.component';
import { OwnerService } from './_services/owner.service';
import { CustomerService } from './_services/customer.service';
import { OwnerlandingComponent } from './_components/ownerlanding/ownerlanding.component';
import { CampaignComponent } from './_components/campaign/campaign.component';
import { CampaignlistComponent } from './_components/campaignlist/campaignlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomepageComponent,
    CustomersignupComponent,
    OwnersignupComponent,
    OwnerlandingComponent,
    OwnerlandingComponent,
    CampaignComponent,
    CampaignlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatGridListModule,
    HttpClientModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatExpansionModule
  ],
  providers: [
    OwnerService,
    CustomerService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
