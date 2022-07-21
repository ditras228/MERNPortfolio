import {createReducer, on} from "@ngrx/store";

import {CreateWorkInputs, setCreateWorkForm} from "./create-work.actions";

export interface State {
  input: CreateWorkInputs
}

const initialState: State = {
  input: {} as CreateWorkInputs,

}
export const createWorkReducer = createReducer(
  initialState,
  on(setCreateWorkForm, (state, {input}) => ({...state, input: input})),
)
