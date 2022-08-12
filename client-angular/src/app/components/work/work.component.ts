import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
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
export class WorkComponent implements OnInit {
  @Input() work: GetWork | undefined;
  @Input() isAuth: boolean = false;
  public isOurLink: boolean = false;

  constructor(public store$: Store, public windowService: WindowService) {}

  editWorkHandler(): void {
    this.store$.dispatch(setEditWorkTags(this.work?.tags));
    this.store$.dispatch(setEditWorkVisible(this.work));
  }

  public openLinkHandler(url: any): void {
    this.windowService.get(url);
  }

  public ngOnInit(): void {
    if ('/' === this.work?.demo) {
      this.isOurLink = true;
    }
  }
}
