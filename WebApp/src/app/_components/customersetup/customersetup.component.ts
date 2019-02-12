import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../../_services/customer.service';
import {CustomerFirstTimeSetup} from '../../_models/customerfirsttimesetup.model';
import {birthDayValidator} from './day-of-month.directive';

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

  minYear = 1901;
  maxYear: number = new Date().getFullYear();

  customerSetupForm = new FormGroup({
    birthMonth: new FormControl('', [
      Validators.required,
    ]),
    birthDay: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.pattern('^[0-9]*$')
    ]),
    birthYear: new FormControl('', [
      Validators.required,
      Validators.min(this.minYear),
      Validators.max(this.maxYear),
      Validators.pattern('^[0-9]*$')
    ]),
    gender: new FormControl('', [Validators.required]),
    occupation: new FormControl('', [Validators.required])
  }, {validators: birthDayValidator, updateOn: 'submit'});

  customerSetupFormData: CustomerFirstTimeSetup;

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

  onSubmit() {
    if (this.customerSetupForm.invalid) {
      return;
    }

    this.customerSetupFormData = {
      email: localStorage.customerEmail,
      birthMonth: this.customerSetupForm.get('birthMonth').value,
      birthDay: this.customerSetupForm.get('birthDay').value,
      birthYear: this.customerSetupForm.get('birthYear').value,
      gender: this.customerSetupForm.get('gender').value,
      occupation: this.customerSetupForm.get('occupation').value
    };

    this.customerService.saveFirstTimeSetup(this.customerSetupFormData);
  }

  get birthYear() { return this.customerSetupForm.get('birthYear'); }
  get birthDay() { return this.customerSetupForm.get('birthDay'); }
}
