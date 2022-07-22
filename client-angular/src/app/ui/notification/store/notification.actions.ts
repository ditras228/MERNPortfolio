import {createAction} from "@ngrx/store";
import {NotificationItem} from "./notification.reducer";

export const addNotification = createAction(
  "[App] AddNotification",
  (notification: NotificationItem) => ({ notification })

);
export const removeLastNotification = createAction(
  "[App] RemoveLastNotification"

);

