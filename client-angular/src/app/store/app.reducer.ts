import {createReducer, on} from "@ngrx/store";
import {setInfo, setWorks} from "./app.actions";
import {Info, Work} from "../../generated/graphql";

export interface State {
  info: Info,
  works: Work[] | null
}
const initialState: State = {
  info: {} as unknown as Info,
  works: [] as Work[]
}
export const appReducer= createReducer(
  initialState,
  on(setInfo, (state, { info }) => ({...state, info: info})),
  on(setWorks, (state, { works }) => ({...state, works: works}))
)
