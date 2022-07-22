import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectInfo } from '../../store/app.selectors';
import { GetInfo } from '../../../generated/graphql';
import { fadeAnimation } from '../../app.animation';
import { setEditInfoVisible } from '../../modals/login/store/login-modal.actions';

@Component({
  selector: 'app-sidebar-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation],
})
export class InfoComponent implements OnInit {
  info$: GetInfo | undefined;
  @Input() isAuth = false;

  constructor(public store$: Store) {}

  editInfoHandler(): void {
    this.store$.dispatch(setEditInfoVisible());
  }
  ngOnInit(): void {
    this.store$.select(selectInfo).subscribe(info => {
      this.info$ = info;
    });
  }
}
