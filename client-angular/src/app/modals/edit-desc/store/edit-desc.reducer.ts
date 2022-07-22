import {createReducer, on} from "@ngrx/store";
import {EditDescInputs, setDeleteDesc, setEditDescForm} from "./edit-desc.actions";

export interface State {
  input: EditDescInputs,
  deleteDescId: number | undefined
}
const initialState: State = {
  input: {} as EditDescInputs,
  deleteDescId: undefined
}
export const editDescReducer= createReducer(
  initialState,
  on(setEditDescForm, (state, { input }) => ({...state, input: input})),
  on(setDeleteDesc, (state, { id}) => ({...state, deleteDescId: id})),
)
