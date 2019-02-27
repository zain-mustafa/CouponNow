import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/_services/customer.service';

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

  constructor(public OwnerLoginService: CustomerService) { }

  ngOnInit() {

    this.ownerInfo = this.OwnerLoginService.getCustomerInfo();
    console.log(this.ownerInfo);

  }

}
