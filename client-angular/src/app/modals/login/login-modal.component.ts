import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {setError, setLoginForm, setLoginVisible, submitLoginForm} from "./store/login-modal.actions";
import {selectLoginError} from "./store/login-modal.selectors";
import {ValidationService} from "../../services/validation.service";


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']

})
export class LoginModalComponent implements OnInit {
  public login = new FormControl
  public password = new FormControl
  public form: FormGroup<{ password: FormControl<string>; login: FormControl<string>; }> | undefined
  public serverError: string | undefined
  public errors: { [key: string]: string } = {};

  constructor(public store$: Store, public validationService: ValidationService) {
  }

  ngOnInit(): void {
    this.store$.select(selectLoginError).subscribe(value => this.serverError = value)
    this.login = new FormControl(null, [Validators.required])
    this.password = new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(12)])

    this.form = new FormGroup({
      login: this.login,
      password: this.password,
    })
  }

  closeModal(): void {
    this.store$.dispatch(setLoginVisible())
  }

  sendForm(): void {
    if (this.form?.invalid) {
      this.errors = this.validationService.GetValidationMessage(this.form, this.errors)
    }

    else {
      this.errors={}
      this.store$.dispatch(setError(''))
      this.store$.dispatch(setLoginForm({login: this.login.value, password: this.password.value}))
      this.store$.dispatch(submitLoginForm())
    }
  }
}
