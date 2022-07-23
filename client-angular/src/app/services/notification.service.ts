import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  NotificationItem,
  NotificationTypes,
} from '../ui/notification/store/notification.reducer';
import {
  addNotification,
  removeLastNotification,
} from '../ui/notification/store/notification.actions';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  public notificationTypes = NotificationTypes;

  constructor(public store$: Store) {}
  private addNotification(notification: NotificationItem): void {
    this.store$.dispatch(addNotification(notification));

    setTimeout(() => {
      this.store$.dispatch(removeLastNotification());
    }, 10000);
  }

  public addSuccessNotification(message: string = 'Успешно'): void {
    this.addNotification({
      message: message,
      type: this.notificationTypes.SUCCESS,
    });
  }

  public addErrorNotification(message: string = 'Непредвиденная ошибка'): void {
    this.addNotification({
      message: message,
      type: this.notificationTypes.ERROR,
    });
  }
}
