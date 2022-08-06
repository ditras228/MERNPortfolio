import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLanguage } from '../navbar/store/navbar.selectors';
import { setLanguageVisible } from '../navbar/store/navbar.actions';
import { fadeAnimation, languageAnimation } from '../../app.animation';
import { setLock } from '../../modals/modal/store/modal.actions';
import { CookieService } from 'ngx-cookie-service';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-nav-language',
  templateUrl: './nav-language.component.html',
  styleUrls: ['./nav-language.component.scss'],
  animations: [fadeAnimation, languageAnimation],
})
export class NavLanguageComponent implements OnInit {
  public isLanguageVisible: boolean | undefined;

  public languages = [
    {
      tag: 'ru',
      title: 'Русский',
    },
    {
      tag: 'en-US',
      title: 'English',
    },
  ];

  constructor(
    public store$: Store,
    public cookieService: CookieService,
    public windowService: WindowService,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  ngOnInit() {
    this.store$
      .select(selectIsLanguage)
      .subscribe(value => (this.isLanguageVisible = value));
  }

  showLangHandler(): void {
    this.store$.dispatch(setLanguageVisible());
    this.store$.dispatch(setLock());
  }

  setLanguageHandler(lang: string): void {
    this.showLangHandler();
    this.cookieService.set('locale', lang);
    this.windowService.changeLang(lang);
  }

  flagClass(tag: string): string {
    return `nav-language__content__item__icon--${tag}`;
  }
}
