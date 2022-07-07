import {createReducer, on} from "@ngrx/store";
import {setInfo, setWorks} from "./app.actions";
import {GetInfo, GetWork} from "../../generated/graphql";

export interface State {
  info: GetInfo,
  works: GetWork[] | null
}
const initialState: State = {
  info: {} as unknown as GetInfo,
  works: [] as GetWork[]
}
export const appReducer= createReducer(
  initialState,
  on(setInfo, (state, { info }) => ({...state, info: info})),
  on(setWorks, (state, { works }) => ({...state, works: works}))
)
