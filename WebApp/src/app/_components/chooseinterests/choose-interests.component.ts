import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ChooseinterestsService } from '../../_services/chooseinterests.service';


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
    { name: 'Bars'},
    { name: 'Books'}
  ];

  constructor(private submitInterestsService: ChooseinterestsService, private formBuilder: FormBuilder) {
    // Create a new array with a form control for each interest
    const controls = this.interests.map(c => new FormControl(false));

    this.form = this.formBuilder.group({
      interests: new FormArray(controls, minSelectedCheckboxes(1))
    });
  }

  submit() {
    const selectedInterests = this.form.value.interests
      .map((v, i) => v ? this.interests[i].name : null)
      .filter(v => v !== null);

    console.log(selectedInterests);

    // TODO: get the actually customerId instead of hard coded value
    this.submitInterestsService.onSubmitInterests('075bcd1586d3dd1d20e9a94e', selectedInterests);
  }

  ngOnInit() {
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
