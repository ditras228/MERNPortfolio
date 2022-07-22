import {
  Component,
  Inject,
  Input,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { GetWork } from '../../../generated/graphql';
import { setEditWorkVisible } from '../../modals/login/store/login-modal.actions';
import { Store } from '@ngrx/store';
import { setEditWorkTags } from '../../modals/edit-work/store/edit-work.actions';
import { platformBrowser } from '@angular/platform-browser';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkComponent {
  @Input() work: GetWork | undefined;
  @Input() isAuth = false;

  constructor(public store$: Store, @Inject(PLATFORM_ID) private platformId) {}

  editWorkHandler(): void {
    this.store$.dispatch(setEditWorkTags(this.work?.tags));

    this.store$.dispatch(setEditWorkVisible(this.work));
  }

  isPortfolio(url: any): boolean {
    if (platformBrowser(this.platformId)) {
      return window.location.origin == url;
    }
    return false;
  }

  public openLink(url: any): void {
    if (platformBrowser(this.platformId)) {
      window.open(url);
    }
  }
}
