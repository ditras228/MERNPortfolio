import { createReducer, on } from '@ngrx/store';
import {
  loginInputs,
  setAuth,
  setError,
  setLoginForm,
} from './login-modal.actions';

export const LoginErrors = {
  NOT_FOUND: 'not_found',
  WRONG_PASSWORD: 'wrong_password',
};

export type errorInputs = {
  type: string;
  message: string;
};

export interface State {
  isAuth: boolean;
  input: loginInputs;
  error: errorInputs | undefined;
}

const initialState: State = {
  isAuth: false,
  error: undefined,
  input: {
    login: '',
    password: '',
  },
};

export const loginModalReducer = createReducer(
  initialState,
  on(setLoginForm, (state, { input }) => ({ ...state, input: input })),
  on(setError, (state, { error }) => ({ ...state, error: error })),
  on(setAuth, (state, { isAuth }) => ({ ...state, isAuth: isAuth }))
);
