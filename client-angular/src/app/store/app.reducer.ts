import {createReducer, on} from "@ngrx/store";
import {setInfo} from "./app.actions";

export interface State {
  info: string
}
const initialState: State = {
  info: ''
}
export const appReducer= createReducer(
  initialState,
  on(setInfo, (state, { info }) => ({...state, info: info}))
)
