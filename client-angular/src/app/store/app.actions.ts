import {createAction, props} from "@ngrx/store";

export const setInfo = createAction('[App] SetInfo', props<{info : string}>())
export const setWorks = createAction('[App] SetWorks')
export const getHabitsSuccessAction = createAction(
  "[App] Get Habits Success",
  (habits: any[]) => ({ habits })
);
