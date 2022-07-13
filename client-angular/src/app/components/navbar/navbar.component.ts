import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {getWorks, setInfo} from "../../store/app.actions";
import {selectIsLoginVisible} from "../../modals/login/store/login-modal.selectors";
import {setLoginVisible} from "../../modals/login/store/login-modal.actions";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  constructor(public store$: Store) {
  }

  showLoginHandler():void{
    this.store$.dispatch(setLoginVisible())
  }
}
