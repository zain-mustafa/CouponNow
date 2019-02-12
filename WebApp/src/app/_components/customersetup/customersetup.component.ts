import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {CustomerService} from '../../_services/customer.service';
import {CustomerFirstTimeSetup} from '../../_models/customerfirsttimesetup.model';

export interface Gender {
  value: string;
  viewValue: string;
}

export interface Month {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-customersetup',
  templateUrl: './customersetup.component.html',
  styleUrls: ['./customersetup.component.scss']
})
export class CustomersetupComponent implements OnInit {

  customerSetupInfo: CustomerFirstTimeSetup;

  genders: Gender[] = [
    {value: 'man', viewValue: 'Man'},
    {value: 'woman', viewValue: 'Woman'},
    {value: 'other', viewValue: 'Other'}
  ];

  months: Month[] = [
    {value: 1, viewValue: 'January'},
    {value: 2, viewValue: 'February'},
    {value: 3, viewValue: 'March'},
    {value: 4, viewValue: 'April'},
    {value: 5, viewValue: 'May'},
    {value: 6, viewValue: 'June'},
    {value: 7, viewValue: 'July'},
    {value: 8, viewValue: 'August'},
    {value: 9, viewValue: 'September'},
    {value: 10, viewValue: 'October'},
    {value: 11, viewValue: 'November'},
    {value: 12, viewValue: 'December'},
  ];

  constructor(public customerService: CustomerService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.customerSetupInfo = {
      email: localStorage.customerEmail,
      birthMonth: form.value.month,
      birthDay: form.value.day,
      birthYear: form.value.year,
      gender: form.value.gender,
      occupation: form.value.occupation
    };

    this.customerService.saveFirstTimeSetup(this.customerSetupInfo);
  }

}
