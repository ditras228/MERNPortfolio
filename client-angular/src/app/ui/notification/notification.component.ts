import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectNotifications } from './store/notification.selectors';
import { NotificationItem } from './store/notification.reducer';
import { listAnimation } from '../../app.animation';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [listAnimation],
})
export class NotificationComponent implements OnInit {
  public notifications: NotificationItem[] | undefined;
  constructor(public store$: Store) {}

  ngOnInit(): void {
    this.store$
      .select(selectNotifications)
      .subscribe(value => (this.notifications = value));
  }
}
