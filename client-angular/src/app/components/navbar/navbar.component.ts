import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {getWorks, setInfo} from "../../store/app.actions";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
}
