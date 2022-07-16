import {createReducer, on} from "@ngrx/store";
import {
  loginInputs,
  setAuth,
  setEditInfoVisible,
  setEditWorkVisible,
  setError,
  setLoginForm,
  setLoginVisible,
  setTags,
} from "./login-modal.actions";
import {GetTag, GetWork} from "../../../../generated/graphql";

export interface State {
  isAuth: boolean,
  isLock: boolean,
  input: loginInputs,
  error: string,
  isLoginVisible: boolean
  isWorkVisible: boolean
  isInfoVisible: boolean
  currentEditWork: GetWork | undefined
  tags: GetTag[]
}
const initialState: State = {
  isWorkVisible: false,
  isInfoVisible: false,
  isAuth: false,
  isLock: false,
  isLoginVisible: false,
  currentEditWork: undefined,
  tags: [] as GetTag[],

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
  on(setTags, (state, {tags}) => ({...state, tags: tags }))
)
