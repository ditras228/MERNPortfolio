import {createReducer, on} from "@ngrx/store";
import {addNotification, removeLastNotification} from "./notification.actions";

export type NotificationItem = {
  message: string,
  typeId: number
}
export interface State {
  notifications: NotificationItem[]
}

const initialState: State = {
  notifications: []  as NotificationItem[]

}
export const notificationReducer = createReducer(
  initialState,
  on(addNotification,(state, {notification})=> ({...state, notifications: [...state.notifications, notification] })),
  on(removeLastNotification,(state)=> ({...state, notifications: state.notifications.filter((_, i)=> i != 0 ) }))
)
