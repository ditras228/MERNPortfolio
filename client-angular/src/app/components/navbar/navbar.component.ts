import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {setInfo} from "../../store/app.actions";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private store: Store) { }
  admin(){
this.store.dispatch(setInfo({info: '123'}))
  }
  ngOnInit(): void {
  }

}
