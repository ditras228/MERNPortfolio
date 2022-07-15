import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {setError, setLoginForm, setLoginVisible, submitLoginForm} from "./store/login-modal.actions";
import {sprintf} from 'sprintf-js'
import {selectLoginError} from "./store/login-modal.selectors";


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']

})
export class LoginModalComponent implements OnInit {
  public login = new FormControl
  public password = new FormControl
  public form
  public passMinLength = 5
  public passMaxLength = 12
  public errors: { [key: string]: string } = {};
  public serverError

  public messages = {
    required: 'Поле не может быть пустым',
    minlength: 'Минимум - 5',
    maxlength: 'Максимум - 12',
  }

  constructor(public store$: Store) {
  }

  closeModal():void{
    this.store$.dispatch(setLoginVisible())
  }

  public getMessage(key: string, ...placeholders): string {
    return sprintf(this.messages[key], placeholders);
  }

  private getValidationMessage(): void {
    const formControl = this.form.controls;

    this.errors = Object.keys(formControl).reduce((acc, key) => {

      if (!formControl[key].valid) {
        const validationRuleKey = Object.keys(this.form.controls[key].errors).shift();

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
  }


  ngOnInit(): void {
    this.store$.select(selectLoginError).subscribe(value => this.serverError=value)
    this.login = new FormControl(null, [Validators.required])
    this.password = new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(12)])

    this.form = new FormGroup({
      login: this.login,
      password: this.password
    })
    this.login.registerOnChange(change => console.log(this.login.value))
  }

  sendForm(): void {
    if (this.form.invalid) {
      return this.getValidationMessage()
    }
    this.errors = {}
    this.store$.dispatch(setError(''))
    this.store$.dispatch(setLoginForm({login: this.login.value, password: this.password.value}))
    this.store$.dispatch(submitLoginForm())
  }
}
