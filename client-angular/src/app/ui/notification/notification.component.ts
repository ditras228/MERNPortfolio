import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectNotifications } from './store/notification.selectors';
import {
  NotificationItem,
  NotificationTypes,
} from './store/notification.reducer';
import { listAnimation } from '../../app.animation';
import { selectLock } from '../../modals/login/store/login-modal.selectors';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [listAnimation],
})
export class NotificationComponent implements OnInit {
  public notifications: NotificationItem[] | undefined;
  public notificationTypes = NotificationTypes;
  public isLock: boolean = false;
  constructor(public store$: Store) {}

  ngOnInit(): void {
    this.store$
      .select(selectNotifications)
      .subscribe(value => (this.notifications = value));
    this.store$.select(selectLock).subscribe(value => (this.isLock = value));
  }
}
