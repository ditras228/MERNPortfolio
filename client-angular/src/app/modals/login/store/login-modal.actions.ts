import { createAction } from '@ngrx/store';
import { GetDesc, GetWork } from '../../../../generated/graphql';
import { errorInputs } from './login-modal.reducer';

export type loginInputs = {
  login: string;
  password: string;
};

export const setLoginForm = createAction(
  '[App] SetLoginForm',
  (input: loginInputs) => ({ input })
);

export const submitLoginForm = createAction('[App] SubmitLoginForm');

export const setLoginVisible = createAction('[App] SetLoginVisible');

export const setEditInfoVisible = createAction('[App] SetEditInfoVisible');

export const setCreateWorkVisible = createAction('[App] SetCreateWorkVisible');

export const setEditDescVisible = createAction(
  '[App] SetEditDescVisible',
  (desc: GetDesc | undefined) => ({ desc })
);

export const setCreateDescVisible = createAction('[App] SetCreateDescVisible');

export const setEditWorkVisible = createAction(
  '[App] SetEditWorkVisible',
  (work: GetWork | undefined) => ({ work })
);

export const setError = createAction(
  '[App] SetError',
  (error: errorInputs) => ({ error })
);

export const setAuth = createAction('[App] Auth', (isAuth: boolean) => ({
  isAuth,
}));
