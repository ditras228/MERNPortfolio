import { Component, Input, ViewEncapsulation } from '@angular/core';
import { GetWork } from '../../../generated/graphql';
import { Store } from '@ngrx/store';
import { setEditWorkTags } from '../../modals/edit-work/store/edit-work.actions';
import { WindowService } from '../../services/window.service';
import { setEditWorkVisible } from '../../modals/modal/store/modal.actions';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkComponent {
  @Input() work: GetWork | undefined;
  @Input() isAuth: boolean = false;

  constructor(public store$: Store, public windowService: WindowService) {}

  editWorkHandler(): void {
    this.store$.dispatch(setEditWorkTags(this.work?.tags));
    this.store$.dispatch(setEditWorkVisible(this.work));
  }

  get isOurLink(): boolean {
    this.windowService.isOurLink(this.work?.demo);
    return false;
  }

  get isNotOurLink(): boolean {
    return !this.isOurLink;
  }

  public openLinkHandler(url: any): void {
    this.windowService.get(url);
  }
}
