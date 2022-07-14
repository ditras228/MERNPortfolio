import {createReducer, on} from "@ngrx/store";
import {loginInputs, setAuth, setError, setLoginForm, setLoginVisible, submitLoginForm} from "./login-modal.actions";

export interface State {
  isAuth: boolean,
  isLock: boolean,
  input: loginInputs,
  error: string,
  isLoginVisible: boolean
}
const initialState: State = {
  isAuth: false,
  isLock: false,
  isLoginVisible: false,
  error: '',
  input: {
    login: '',
    password: ''
  },
}
export const loginModalReducer= createReducer(
  initialState,
  on(setLoginForm, (state, { input }) => ({...state, input: input})),
  on(setLoginVisible, (state) => ({...state, isLoginVisible: !state.isLoginVisible, isLock: !state.isLock})),
  on(setError, (state, {error}) => ({...state, error: error })),
  on(setAuth, (state, {isAuth}) => ({...state, isAuth: isAuth }))
)
