import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ownerlanding',
  templateUrl: './ownerlanding.component.html',
  styleUrls: ['./ownerlanding.component.css']
})
export class OwnerlandingComponent implements OnInit {

  public businesses: string;
  public campaigns: string;
  public paymentMethod: string;

  constructor() { }

  ngOnInit() {
  }

}
