import {createReducer, on} from "@ngrx/store";
import {
  loginInputs,
  setAuth,
  setEditInfoVisible, setEditWorkVisible,
  setError,
  setLoginForm,
  setLoginVisible,
} from "./login-modal.actions";

export interface State {
  isAuth: boolean,
  isLock: boolean,
  input: loginInputs,
  error: string,
  isLoginVisible: boolean
  isWorkVisible: boolean
  isInfoVisible: boolean
  currentEditWorkId: number | undefined

}
const initialState: State = {
  isWorkVisible: false,
  isInfoVisible: false,
  isAuth: false,
  isLock: false,
  isLoginVisible: false,
  currentEditWorkId: -1,

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
  on(setEditWorkVisible, (state, {id}) => ({...state, isWorkVisible: !state.isWorkVisible, currentEditWorkId: id, isLock: !state.isLock})),
  on(setError, (state, {error}) => ({...state, error: error })),
  on(setAuth, (state, {isAuth}) => ({...state, isAuth: isAuth }))
)
