import {Component, OnInit, PLATFORM_ID,Inject} from '@angular/core';
import {getInfo, getWorks} from "./store/app.actions";
import {Store} from "@ngrx/store";

import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {
  selectEditInfoVisible,
  selectEditWorkVisible,
  selectIsLoginVisible,
  selectLock
} from "./modals/login/store/login-modal.selectors";



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
  public isLoginVisible: boolean | undefined;
  public isEditInfoVisible: boolean | undefined;
  public isEditWorkVisible: boolean | undefined;

  ngOnInit(): void{
    if(isPlatformBrowser(this.platformId)){
      this.store$.select(selectIsLoginVisible).subscribe(value => this.isLoginVisible= value)
      this.store$.select(selectEditInfoVisible).subscribe(value => this.isEditInfoVisible= value)
      this.store$.select(selectEditWorkVisible).subscribe(value => this.isEditWorkVisible= value)

      this.store$.select(selectLock).subscribe(value=> this.isLock=value)
      this.store$.dispatch(getWorks())
      this.store$.dispatch(getInfo())
    }
  }

}
