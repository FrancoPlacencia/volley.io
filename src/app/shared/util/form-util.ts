import { FormGroup } from '@angular/forms';

/**
 * Reset the form iterating the controls of the form.
 * @param formGroup
 */
export function resetFormGroup(formGroup: FormGroup): void {
  formGroup.reset({ emitEvent: false });
  Object.keys(formGroup.controls).forEach((key) => {
    formGroup.controls[key].setErrors(null, { emitEvent: false });
    formGroup.controls[key].reset(undefined, { emitEvent: false });
  });
  //formGroup.markAsPristine({ onlySelf: true });
  //formGroup.markAsUntouched({ onlySelf: true });
}
