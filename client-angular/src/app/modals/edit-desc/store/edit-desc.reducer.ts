import {createReducer, on} from "@ngrx/store";
import {EditDescInputs, setEditDescForm} from "./edit-desc.actions";

export interface State {
  input: EditDescInputs
}
const initialState: State = {
  input: {} as EditDescInputs
}
export const editDescReducer= createReducer(
  initialState,
  on(setEditDescForm, (state, { input }) => ({...state, input: input})),
)
