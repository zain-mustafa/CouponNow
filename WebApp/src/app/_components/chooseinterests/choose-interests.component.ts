import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ChooseinterestsService } from '../../_services/chooseinterests.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { CustomerService } from 'src/app/_services/customer.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-choose-interests',
  templateUrl: './choose-interests.component.html',
  styleUrls: ['./choose-interests.component.css']
})
export class ChooseInterestsComponent implements OnInit {

 form: FormGroup;
 private interestsSubs: Subscription;

 customerEmail: String;
  public interests = [
    { name: 'Music' },
    { name: 'Art' },
    { name: 'Restaurants' },
    { name: 'Clothes' },
    { name: 'Bars' },
    { name: 'Books' }
  ];

  selectedInterests = [];

  interestsToRemove = [];

  interestToDisplay = this.interests;

  customerToken: string;

  constructor(private submitInterestsService: ChooseinterestsService, private formBuilder: FormBuilder,
              private router: Router, private snackBar: MatSnackBar, public customerInfo: CustomerService) {
    // Create a new array with a form control for each interest
    const controls = this.interests.map(() => new FormControl(false));

    this.form = this.formBuilder.group({
      interests: new FormArray(controls, minSelectedCheckboxes(1))
    });

    this.customerEmail = this.customerInfo.customerInfo.email;
    console.log(this.customerEmail);
  }

  ngOnInit() {

    this.customerInfo.customerInfo.interests.forEach(savedInterest => {
      this.interestToDisplay = this.interestToDisplay.filter(interest => {
        return interest.name !== savedInterest.interest;
      });
    });
  }

  onSelect(values: any) {
    console.log(values.currentTarget.checked);
    if (values.currentTarget.checked) {
      this.selectedInterests.push({
        interest: values.currentTarget.value,
        rating: 1});
    } else {
      this.selectedInterests = this.selectedInterests.filter(function(value, index, arr) {
        if (value.interest !== values.currentTarget.value) {
            return value;
        }
    });
    }
  }

  onSubmitInterests() {
    if (this.customerInfo.customerInfo.interests.length <= 0 && this.selectedInterests.length > 0) {
      console.log('First Time');
      this.submitInterestsService.onSaveInterests(this.customerEmail, this.selectedInterests)
      .subscribe(response => {
        console.log(response);
        this.customerInfo.customerInfo.interests = this.selectedInterests;
        this.snackBar.open('Interests Added', 'Dismiss', {
          duration: 5000,
        });
        this.router.navigate(['/customerprofile']);
      });
    } else if ( this.customerInfo.customerInfo.interests.length > 0 && this.selectedInterests.length > 0 ) {
      console.log('Appending Interests List');
      console.log(this.selectedInterests);
      this.submitInterestsService.onAppendInterests(this.customerEmail, this.selectedInterests)
      .subscribe(response => {
        console.log(response);
        this.selectedInterests.forEach(interest => {
          this.customerInfo.customerInfo.interests.push(interest);
        });
        this.snackBar.open('Interests Added', 'Dismiss', {
          duration: 5000,
        });
        this.router.navigate(['/customerprofile']);
      });

    } else {
      this.snackBar.open('Please select an interest to Add', 'Dismiss', {
        duration: 5000,
      });
      console.log('Please select an interest to Add!!');
    }

    }

    onRemoveSubmitted(interestToDelete) {
      const interestId = interestToDelete._id;
      const interestName = interestToDelete.interest;
      this.submitInterestsService.onDeleteInterests(this.customerEmail, interestName)
      .subscribe(response => {
        console.log(response);
        this.interestToDisplay.push({name: interestName});
      });
    }

  } // End of Main Function

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
