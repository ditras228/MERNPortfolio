import {createReducer, on} from "@ngrx/store";
import {loginInputs, setLoginForm, setLoginVisible, submitLoginForm} from "./login-modal.actions";

export interface State {
  input: loginInputs,
  isLoginVisible: boolean
}
const initialState: State = {
  isLoginVisible: false,
  input: {
    login: '',
    password: ''
  },
}
export const loginModalReducer= createReducer(
  initialState,
  on(setLoginForm, (state, { input }) => ({...state, input: input})),
  on(setLoginVisible, (state) => ({...state, isLoginVisible: !state.isLoginVisible}))
)
