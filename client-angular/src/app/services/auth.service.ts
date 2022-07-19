import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {sprintf} from 'sprintf-js'
import {Store} from "@ngrx/store";
import {setAuth, setLoginVisible} from "../modals/login/store/login-modal.actions";
import {CookieService} from "ngx-cookie-service";

@Injectable({providedIn: "root"})
export class AuthService {
  constructor(public store$: Store, public cookieService: CookieService) {
  }
  public logout():void{
    this.cookieService.delete('token')
    this.store$.dispatch(setAuth(false))

  }
  public login(token: string){
    this.store$.dispatch(setAuth(true))
    this.cookieService.set('token', token)
    this.store$.dispatch(setLoginVisible())
  }
}
