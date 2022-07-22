import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotificationItem } from '../ui/notification/store/notification.reducer';
import {
  addNotification,
  removeLastNotification,
} from '../ui/notification/store/notification.actions';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(public store$: Store) {}
  public addNotification(notification: NotificationItem): void {
    this.store$.dispatch(addNotification(notification));

    setTimeout(() => {
      this.store$.dispatch(removeLastNotification());
    }, 10000);
  }
}
