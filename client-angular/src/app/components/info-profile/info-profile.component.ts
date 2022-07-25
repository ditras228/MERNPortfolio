import { Component, Input } from '@angular/core';
import { UrlService } from '../../services/url.service';
import { GetInfo } from '../../../generated/graphql';
import { setEditInfoVisible } from '../../modals/login/store/login-modal.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-info-profile',
  templateUrl: './info-profile.component.html',
  styleUrls: ['./info-profile.component.scss'],
})
export class InfoProfileComponent {
  @Input() isAuth: boolean = false;
  @Input() info: GetInfo | undefined;

  constructor(public urlService: UrlService, public store$: Store) {}

  editInfoHandler(): void {
    this.store$.dispatch(setEditInfoVisible());
  }

  formBgImgUrlHandler(url: string | undefined): string {
    return this.urlService.formBgImgUrl(url);
  }
}
