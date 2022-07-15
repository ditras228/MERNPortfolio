import {createReducer, on} from "@ngrx/store";
import {setInfo, setWorks, setLock} from "./app.actions";
import {GetInfo, GetWork} from "../../generated/graphql";

export interface State {
  isLock: boolean,
  info: GetInfo,
  works: GetWork[] | null,

}
const initialState: State = {
  isLock: false,
  info: {} as unknown as GetInfo,
  works: [] as GetWork[],
}
export const appReducer= createReducer(
  initialState,
  on(setInfo, (state, { info }) => ({...state, info: info})),
  on(setWorks, (state, { works }) => ({...state, works: works})),
  on(setLock, (state,{value}) => ({...state, isLock: value}))
)
