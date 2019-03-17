import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/_services/business.service';

@Component({
  selector: 'app-ownerlanding',
  templateUrl: './ownerlanding.component.html',
  styleUrls: ['./ownerlanding.component.css']
})
export class OwnerlandingComponent implements OnInit {

  public businesses: string;
  public campaigns: string;
  public paymentMethod: string;
  public isListTrue;

  constructor(
    public businessService: BusinessService
  ) { }

  ngOnInit() {
  }

}
