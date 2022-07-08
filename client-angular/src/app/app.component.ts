import {Component, OnInit, PLATFORM_ID,Inject} from '@angular/core';
import {getInfo, getWorks} from "./store/app.actions";
import {Store} from "@ngrx/store";

import {isPlatformBrowser, isPlatformServer} from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit{
  title = 'client-angular';

  constructor(private store$: Store,
              @Inject(PLATFORM_ID) private platformId
  ) { }

  ngOnInit(): void{
    if(isPlatformBrowser(this.platformId)){
      this.store$.dispatch(getWorks())
      this.store$.dispatch(getInfo())
    }
  }

}
