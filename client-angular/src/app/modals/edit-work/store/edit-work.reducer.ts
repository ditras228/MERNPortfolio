import {createReducer, on} from "@ngrx/store";
import {EditWorkInputs, setEditWorkForm,} from "./edit-work.actions";

export interface State {
  input: EditWorkInputs
}
const initialState: State = {
  input: {} as EditWorkInputs
}
export const editWorkReducer= createReducer(
  initialState,
  on(setEditWorkForm, (state, { input }) => ({...state, input: input})),
)
