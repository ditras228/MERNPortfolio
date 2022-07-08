import { Component, OnInit } from '@angular/core';
import {selectInfo, selectWorks} from "../../store/app.selectors";
import {GetInfo, GetWork} from "../../../generated/graphql";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent  {


}
