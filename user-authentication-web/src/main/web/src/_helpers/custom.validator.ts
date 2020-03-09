import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export class CustomValidators {
  static dateValidator(control: AbstractControl) {
    if (control && control.value && !moment(control.value, 'DD/MM/YYY', true).isValid()) {
      return { 'dateValidator': true };
    }
    return null;
  }
}
