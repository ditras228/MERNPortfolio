import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {selectIsLoginVisible} from "../login/store/login-modal.selectors";
import {setLoginVisible} from "../login/store/login-modal.actions";
import {fadeAnimation, modalAnimation} from "../../app.animation";
import {setLock} from "../../store/app.actions";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [modalAnimation, fadeAnimation]
})
export class ModalComponent implements OnInit{

  public isVisible: boolean | undefined;
  constructor(public store$: Store) {
  }
  ngOnInit() {
    this.store$.select(selectIsLoginVisible).subscribe(value => this.isVisible= value)
  }
  closeModal():void{
    this.store$.dispatch(setLoginVisible())

  }

}
