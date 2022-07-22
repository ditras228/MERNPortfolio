import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {setAuth, setLoginVisible} from "../modals/login/store/login-modal.actions";
import {CookieService} from "ngx-cookie-service";
import {NotificationService} from "./notification.service";

@Injectable({providedIn: "root"})
export class AuthService {
  constructor(public store$: Store,
              public cookieService: CookieService,
              public notificationService: NotificationService) {
  }

  public logout():void{
    this.cookieService.delete('token')
    this.store$.dispatch(setAuth(false))
    this.notificationService.addNotification({typeId: 0, message: 'Логаут'})

  }

  public login(token: string){
    this.store$.dispatch(setAuth(true))
    this.cookieService.set('token', token)
    this.store$.dispatch(setLoginVisible())
    this.notificationService.addNotification({typeId: 0, message: 'Логин'})
  }
}
