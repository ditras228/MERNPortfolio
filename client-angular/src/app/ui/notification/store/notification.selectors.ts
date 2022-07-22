import {State} from "./notification.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const featureName = 'notification';

const editWorkState = createFeatureSelector<State>(featureName);

export const selectNotifications = createSelector(editWorkState, state => state.notifications);
