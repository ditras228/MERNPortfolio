import {createReducer, on} from "@ngrx/store";
import {
  loginInputs,
  setAuth,
  setCreateDescVisible,
  setCreateWorkVisible,
  setEditDescVisible,
  setEditInfoVisible,
  setEditWorkVisible,
  setError,
  setLoginForm,
  setLoginVisible,
} from "./login-modal.actions";
import {GetDesc, GetWork} from "../../../../generated/graphql";

export type errorInputs = {
  id: number,
  message: string
}

export interface State {
  isAuth: boolean,
  isLock: boolean,
  input: loginInputs,
  error: errorInputs | undefined,
  isLoginVisible: boolean
  isWorkVisible: boolean
  isCreateDescVisible: boolean
  isCreateWorkVisible: boolean
  isInfoVisible: boolean
  isDescVisible: boolean
  currentEditWork: GetWork | undefined
  currentEditDesc: GetDesc | undefined
}

const initialState: State = {
  isWorkVisible: false,
  isCreateDescVisible: false,
  isCreateWorkVisible: false,
  isInfoVisible: false,
  isDescVisible: false,
  isAuth: false,
  isLock: false,
  isLoginVisible: false,
  currentEditWork: undefined,
  currentEditDesc: undefined,

  error: undefined,
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
  on(setCreateWorkVisible, (state) => ({...state, isCreateWorkVisible: !state.isCreateWorkVisible, isLock: !state.isLock})),
  on(setEditDescVisible, (state, {desc}) => ({...state, isDescVisible: !state.isDescVisible, currentEditDesc: desc, isLock: !state.isLock})),
  on(setCreateDescVisible, (state) => ({...state, isCreateDescVisible: !state.isCreateDescVisible,  isLock: !state.isLock})),
  on(setError, (state, { error}) => ({...state, error: error})),
  on(setAuth, (state, {isAuth}) => ({...state, isAuth: isAuth })),
)
