import {
  Component,
  Inject,
  LOCALE_ID,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { getInfo, getWorks } from './store/app.actions';
import { Store } from '@ngrx/store';

import { isPlatformBrowser } from '@angular/common';
import { selectIsAuth } from './modals/login/store/login-modal.selectors';
import { CookieService } from 'ngx-cookie-service';
import { setAuth } from './modals/login/store/login-modal.actions';
import {
  selectCreateDescVisible,
  selectCreateWorkVisible,
  selectEditDescVisible,
  selectEditInfoVisible,
  selectEditWorkVisible,
  selectIsLoginVisible,
  selectLock,
} from './modals/modal/store/modal.selectors';
import { WindowService } from './services/window.service';
import { Title } from '@angular/platform-browser';
import { selectInfo } from './store/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'client-angular';
  public isAuth;
  public isLock = false;

  constructor(
    private store$: Store,
    public cookieService: CookieService,
    public windowService: WindowService,
    @Inject(PLATFORM_ID) private platformId,
    @Inject(LOCALE_ID) public locale: string,
    private renderer: Renderer2,
    public titleService: Title
  ) {}

  ngOnInit(): void {
    let locale = this.cookieService.get('locale');
    if (locale !== null) {
      this.windowService.changeLang(locale);
    } else {
      this.cookieService.set('locale', this.locale);
    }
    if (isPlatformBrowser(this.platformId)) {
      if (this.cookieService.get('token')) {
        this.store$.dispatch(setAuth(true));
      }
      this.store$
        .select(selectIsAuth)
        .subscribe(value => (this.isAuth = value));

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

    this.store$
      .select(selectInfo)
      .subscribe(value => this.titleService.setTitle(value.name.field));
  }
}
