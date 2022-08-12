import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectNotifications } from './store/notification.selectors';
import {
  NotificationItem,
  NotificationTypes,
} from './store/notification.reducer';
import { listAnimation } from '../../app.animation';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [listAnimation],
})
export class NotificationComponent implements OnInit {
  public notifications: NotificationItem[] | undefined;
  public notificationTypes = NotificationTypes;
  constructor(public store$: Store, @Inject(PLATFORM_ID) private platformId) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store$
        .select(selectNotifications)
        .subscribe(value => (this.notifications = value));
    }
  }
}
