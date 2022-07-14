import {Component, OnInit, PLATFORM_ID,Inject} from '@angular/core';
import {getInfo, getWorks} from "./store/app.actions";
import {Store} from "@ngrx/store";

import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {selectLock} from "./modals/login/store/login-modal.selectors";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit{
  title = 'client-angular';
  public isLock = false as boolean
  constructor(private store$: Store,
              @Inject(PLATFORM_ID) private platformId
  ) { }

  ngOnInit(): void{
    if(isPlatformBrowser(this.platformId)){
      this.store$.select(selectLock).subscribe(value=> this.isLock=value)
      this.store$.dispatch(getWorks())
      this.store$.dispatch(getInfo())
    }
  }

}
