import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { getInfo, getWorks } from './store/app.actions';
import { Store } from '@ngrx/store';

import { isPlatformBrowser } from '@angular/common';
import {
  selectCreateDescVisible,
  selectCreateWorkVisible,
  selectEditDescVisible,
  selectEditInfoVisible,
  selectEditWorkVisible,
  selectIsAuth,
  selectIsLoginVisible,
  selectLock,
} from './modals/login/store/login-modal.selectors';
import { CookieService } from 'ngx-cookie-service';
import { setAuth } from './modals/login/store/login-modal.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'client-angular';
  public isLock = false;
  public isAuth;

  constructor(
    private store$: Store,
    private renderer: Renderer2,
    public cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId
  ) {}
  public isLoginVisible: boolean | undefined;
  public isEditInfoVisible: boolean | undefined;
  public isEditWorkVisible: boolean | undefined;
  public isEditDescVisible: boolean | undefined;
  public isCreateWorkVisible: boolean | undefined;
  public isCreateDescVisible: boolean | undefined;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.cookieService.get('token')) {
        this.store$.dispatch(setAuth(true));
      }
      this.store$
        .select(selectIsAuth)
        .subscribe(value => (this.isAuth = value));
      this.store$
        .select(selectIsLoginVisible)
        .subscribe(value => (this.isLoginVisible = value));
      this.store$
        .select(selectEditInfoVisible)
        .subscribe(value => (this.isEditInfoVisible = value));
      this.store$
        .select(selectEditWorkVisible)
        .subscribe(value => (this.isEditWorkVisible = value));
      this.store$
        .select(selectEditDescVisible)
        .subscribe(value => (this.isEditDescVisible = value));
      this.store$
        .select(selectCreateWorkVisible)
        .subscribe(value => (this.isCreateWorkVisible = value));
      this.store$
        .select(selectCreateDescVisible)
        .subscribe(value => (this.isCreateDescVisible = value));

      this.store$.select(selectLock).subscribe(value => {
        this.isLock = value;
        if (this.isLock) {
          this.renderer.addClass(document.body, 'stop-scrolling');
        } else {
          this.renderer.removeClass(document.body, 'stop-scrolling');
        }
      });
    }

    this.store$.dispatch(getWorks());
    this.store$.dispatch(getInfo());
  }
}
