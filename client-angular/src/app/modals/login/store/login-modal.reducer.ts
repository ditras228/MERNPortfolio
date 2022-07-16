import {createReducer, on} from "@ngrx/store";
import {
  loginInputs,
  setAuth,
  setEditInfoVisible,
  setEditWorkVisible,
  setError,
  setLoginForm,
  setLoginVisible,
} from "./login-modal.actions";
import { GetWork} from "../../../../generated/graphql";

export interface State {
  isAuth: boolean,
  isLock: boolean,
  input: loginInputs,
  error: string,
  isLoginVisible: boolean
  isWorkVisible: boolean
  isInfoVisible: boolean
  currentEditWork: GetWork | undefined
}
const initialState: State = {
  isWorkVisible: false,
  isInfoVisible: false,
  isAuth: false,
  isLock: false,
  isLoginVisible: false,
  currentEditWork: undefined,

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
  on(setEditInfoVisible, (state) => ({...state, isInfoVisible: !state.isInfoVisible, isLock: !state.isLock})),
  on(setEditWorkVisible, (state, {work}) => ({...state, isWorkVisible: !state.isWorkVisible, currentEditWork: work, isLock: !state.isLock})),
  on(setError, (state, {error}) => ({...state, error: error })),
  on(setAuth, (state, {isAuth}) => ({...state, isAuth: isAuth })),
)
