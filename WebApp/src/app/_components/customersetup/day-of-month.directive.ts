import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

// validate that the given day exists within the month of the year
export const birthDayValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const month = control.get('birthMonth').value;
    const day = control.get('birthDay').value;
    const year = control.get('birthYear').value;
    const daysInMonth = new Date(year, month, 0).getDate();

    return (day < 1 || day > daysInMonth) ? {'appValidDay': true} : null;
};
