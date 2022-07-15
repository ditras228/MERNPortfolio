import {createAction} from "@ngrx/store";

export type loginInputs= {
  login: string,
  password: string
}

export const setLoginForm = createAction(
  "[App] SetLoginForm",
  (input: loginInputs) => ({ input })
);
export const submitLoginForm = createAction(
  "[App] SubmitLoginForm"
);
export const setLoginVisible = createAction(
  "[App] SetLoginVisible"
);
export const setEditInfoVisible = createAction(
  "[App] SetEditInfoVisible"
);
export const setEditWorkVisible = createAction(
  "[App] SetEditWorkVisible",
  (id: number | undefined)=>({id})
);
export const setError = createAction(
  "[App] SetError",
  (error: string) => ({ error })
);
export const setAuth = createAction(
  "[App] Auth",
  (isAuth:boolean)=>({isAuth})
);
