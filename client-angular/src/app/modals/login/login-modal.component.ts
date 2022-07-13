import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {loginInputs, setLoginForm, submitLoginForm} from "./store/login-modal.actions";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']

})
export class LoginModalComponent implements OnInit{
  public login = new FormControl
  public password = new FormControl
  public form: FormGroup | undefined

  constructor(public store$: Store) {
  }

  ngOnInit(): void {
    this.login = new FormControl(null, [Validators.required])
    this.password = new FormControl(null,[Validators.required] )

    this.form = new FormGroup({
      login: this.login,
      password: this.password
    })
    this.login.registerOnChange(change => console.log(this.login.value))
  }

  sendForm():void{
    this.store$.dispatch(setLoginForm({login: this.login.value, password: this.password.value}))
    this.store$.dispatch(submitLoginForm())
  }
}
