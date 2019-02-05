import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ownerlanding',
  templateUrl: './ownerlanding.component.html',
  styleUrls: ['./ownerlanding.component.css']
})
export class OwnerlandingComponent implements OnInit {

  private businesses: string;
  private campaigns: string;
  private paymentMethod: string;

  constructor() { }

  ngOnInit() {
  }

}
