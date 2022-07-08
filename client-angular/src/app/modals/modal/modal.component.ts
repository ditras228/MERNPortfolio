import { Component, OnInit } from '@angular/core';
import {selectInfo, selectWorks} from "../../store/app.selectors";
import {GetInfo, GetWork} from "../../../generated/graphql";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {



}
