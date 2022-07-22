import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {sprintf} from 'sprintf-js'

@Injectable({providedIn: "root"})
export class ValidationService {
  constructor() {
  }

  public passMinLength = 5
  public passMaxLength = 12

  public messages = {
    required: 'Поле не может быть пустым',
    minlength: 'Минимум - 5',
    maxlength: 'Максимум - 12',
  }

  public getMessage(key: string, ...placeholders): string {
    return sprintf(this.messages[key], placeholders);
  }

  public GetValidationMessage(form: FormGroup, errors: { [key: string]: string }): { [key: string]: string } {
    const formControl = form.controls;

    errors = Object.keys(formControl).reduce((acc, key) => {
      if (!formControl[key].valid) {
        const validationRuleKey = Object.keys(form.controls[key].errors || {}).shift();

        switch (validationRuleKey) {
          case 'minlength':
            acc[key] = this.getMessage(
              validationRuleKey,
              this.passMinLength
            );
            break;
          case 'maxlength':
            acc[key] = this.getMessage(
              validationRuleKey,
              this.passMaxLength
            );
            break;
          default:
            acc[key] = this.getMessage(validationRuleKey || '');
        }
      }
      return acc;
    }, {} as { [key: string]: string });
    return errors
  }

}
