import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {selectIsLoginVisible} from "../login/store/login-modal.selectors";
import {setLoginVisible} from "../login/store/login-modal.actions";
import {fadeAnimation, modalAnimation} from "../../app.animation";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [modalAnimation, fadeAnimation]
})
export class ModalComponent {

  constructor(public store$: Store) {
  }



}
