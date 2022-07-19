import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {getWorks, setInfo} from "../../store/app.actions";
import {selectIsAuth, selectIsLoginVisible, selectLock} from "../../modals/login/store/login-modal.selectors";
import {setAuth, setLoginVisible} from "../../modals/login/store/login-modal.actions";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isAuth
  public isLock
  constructor(public store$: Store, public authService: AuthService) {
  }
  ngOnInit() {
    this.store$.select(selectIsAuth).subscribe(value=>this.isAuth=value)
    this.store$.select(selectLock).subscribe(value=>this.isLock=value)
  }

  showLoginHandler():void{
    this.store$.dispatch(setLoginVisible())
  }
}
