import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {getWorks, setInfo} from "../../store/app.actions";
import {selectIsAuth, selectIsLoginVisible} from "../../modals/login/store/login-modal.selectors";
import {setLoginVisible} from "../../modals/login/store/login-modal.actions";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isAuth
  constructor(public store$: Store) {
  }
  ngOnInit() {
    this.store$.select(selectIsAuth).subscribe(value=>this.isAuth=value)
  }

  showLoginHandler():void{
    this.store$.dispatch(setLoginVisible())
  }
}
