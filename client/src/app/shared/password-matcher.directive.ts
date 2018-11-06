import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

export function passwordMatcher(c: AbstractControl) {
  if (!c.get('password') || !c.get('confirm')){
    return null;
  }
  return c.get('password').value === c.get('confirm').value
    ? null : { 'nomatch': true };
}

@Directive({
  selector: '[password-matcher]',
  providers: [
    { provide: NG_VALIDATORS, multi: true, useValue: passwordMatcher }
  ]
})
export class PasswordMatcherDirective {

}
