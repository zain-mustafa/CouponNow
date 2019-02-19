import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ChooseinterestsService } from '../../_services/chooseinterests.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-choose-interests',
  templateUrl: './choose-interests.component.html',
  styleUrls: ['./choose-interests.component.css']
})
export class ChooseInterestsComponent implements OnInit {

  form: FormGroup;
  interests = [
    { name: 'Music' },
    { name: 'Art' },
    { name: 'Restaurants' },
    { name: 'Clothes' },
    { name: 'Bars' },
    { name: 'Books' }
  ];

  customerToken: string;

  constructor(private submitInterestsService: ChooseinterestsService, private formBuilder: FormBuilder,
              private router: Router, private snackBar: MatSnackBar) {
    // Create a new array with a form control for each interest
    const controls = this.interests.map(() => new FormControl(false));

    this.form = this.formBuilder.group({
      interests: new FormArray(controls, minSelectedCheckboxes(1))
    });
  }

  submit() {
    const selectedInterests = this.form.value.interests
      .map((v, i) => v ? this.interests[i].name : null)
      .filter(v => v !== null);

    console.log(selectedInterests);

    if (this.customerToken != null) {
      this.submitInterestsService.onSubmitInterests(this.customerToken, selectedInterests);

      this.snackBar.open('Your interests have been saved!', 'Dismiss', {
        duration: 5000,
      });

      this.router.navigate(['/customerprofile']);
    } else {
      console.log('Unauthorized request to save customer interests');

      this.snackBar.open('An error occurred while saving your interests.', 'Dismiss', {
        duration: 5000,
      });
    }
  }

  ngOnInit() {
    this.customerToken = localStorage.getItem('customerToken');

    if (localStorage.getItem('customerToken') != null) {
      this.submitInterestsService.getCustomerInterests(this.customerToken)
        .subscribe(response => {
          const prevInterests = response['interests'];

          this.interests.forEach((interest, index) => {
            this.form.controls.interests['controls'][index]
              .setValue(prevInterests.includes(interest.name));
          });

        }, error => {
          console.log(error);
        });
    }
  }

}

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
