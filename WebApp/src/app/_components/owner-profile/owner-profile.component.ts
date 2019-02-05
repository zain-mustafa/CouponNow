import { Component, OnInit } from '@angular/core';
import { OwnerService } from 'src/app/_services/owner.service';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.scss']
})
export class OwnerProfileComponent implements OnInit {

  public ownerInfo: any = {
    email: '',
    phone: '',
    firstname: '',
    lastname: ''
  };

  constructor(public OwnerLoginService: OwnerService) { }

  ngOnInit() {

    this.ownerInfo = this.OwnerLoginService.getOwnerInfo();

  }

}
