import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setLoginForm, submitLoginForm } from './store/login-modal.actions';
import { selectLoginError } from './store/login-modal.selectors';
import { ValidationService } from '../../services/validation.service';
import { errorInputs, LoginErrors } from './store/login-modal.reducer';
import { setLoginVisible } from '../modal/store/modal.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  public login = new FormControl();
  public password = new FormControl();
  public form:
    | FormGroup<{ password: FormControl<string>; login: FormControl<string> }>
    | undefined;
  public loginErrors = LoginErrors;
  public serverError: errorInputs | undefined;
  public errors: { [key: string]: string } = {};

  constructor(
    public store$: Store,
    public validationService: ValidationService,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store$
        .select(selectLoginError)
        .subscribe(value => (this.serverError = value));
      this.login = new FormControl(null, [Validators.required]);
      this.password = new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(12),
      ]);

      this.form = new FormGroup({
        login: this.login,
        password: this.password,
      });
    }
  }

  closeModalHandler(): void {
    this.store$.dispatch(setLoginVisible());
  }

  sendForm(): void {
    if (this.form?.invalid) {
      this.errors = this.validationService.GetValidationMessage(
        this.form,
        this.errors
      );
    } else {
      this.errors = {};
      this.store$.dispatch(
        setLoginForm({ login: this.login.value, password: this.password.value })
      );
      this.store$.dispatch(submitLoginForm());
    }
  }
}
