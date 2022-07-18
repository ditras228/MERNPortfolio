import {createAction} from "@ngrx/store";
import {GetDesc, GetTag, GetWork} from "../../../../generated/graphql";

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
export const setEditDescVisible = createAction(
  "[App] SetEditDescVisible",
  (desc:GetDesc | undefined)=>({desc})
);
export const setEditWorkVisible = createAction(
  "[App] SetEditWorkVisible",
  (work: GetWork | undefined)=>({work})
);
export const setError = createAction(
  "[App] SetError",
  (error: string) => ({ error })
);
export const setAuth = createAction(
  "[App] Auth",
  (isAuth:boolean)=>({isAuth})
);

