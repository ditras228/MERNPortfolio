import {
  Component,
  Inject,
  LOCALE_ID,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAuth } from '../../modals/login/store/login-modal.selectors';
import { AuthService } from '../../services/auth.service';
import {
  setLock,
  setLoginVisible,
} from '../../modals/modal/store/modal.actions';
import { selectIsLanguage } from './store/navbar.selectors';
import { setLanguageVisible } from './store/navbar.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isAuth: boolean | undefined;
  public isLanguageVisible: boolean | undefined;

  constructor(
    public store$: Store,
    public authService: AuthService,
    @Inject(LOCALE_ID) public locale: string,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store$
        .select(selectIsAuth)
        .subscribe(value => (this.isAuth = value));
      this.store$
        .select(selectIsLanguage)
        .subscribe(value => (this.isLanguageVisible = value));
    }
  }

  showLangHandler(): void {
    this.store$.dispatch(setLanguageVisible());
    this.store$.dispatch(setLock());
  }

  showLoginHandler(): void {
    this.store$.dispatch(setLoginVisible());
  }

  get currentLocale() {
    return this.locale.slice(0, 2);
  }
}
