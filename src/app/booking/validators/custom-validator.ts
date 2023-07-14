import { AbstractControl, FormControl } from '@angular/forms';

export class CustomValidator {
  static validateName(control: AbstractControl) {
    const val = control.value as string;
    if (val.includes('test')) {
      return {
        invalidName: true,
      };
    }
    return null;
  }
  static validateSpecialChar(char: string) {
    return (control: AbstractControl) => {
      const val = control.value as string;
      if (val.includes(char)) {
        return {
          invalidSpecialChar: true,
        };
      } else {
        return null;
      }
    };
  }
  static validatedate(control: FormControl) {
    const checkinDate: any = new Date(control.get('checkinDate')?.value);
    const checkoutDate: any = new Date(control.get('checkoutDate')?.value);
    const diffTime = Math.abs(checkoutDate - checkinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) {
      control.get('checkoutDate')?.setErrors({
        invalidDate: true,
      });
      return {
        invalidDate: true,
      };
    }
    return null;
  }
}
