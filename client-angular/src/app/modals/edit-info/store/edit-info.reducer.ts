import { createReducer, on } from '@ngrx/store';
import { EditInfoInputs, setEditInfoForm } from './edit-info.actions';

export interface State {
  input: EditInfoInputs;
}
const initialState: State = {
  input: {} as EditInfoInputs,
};
export const editInfoReducer = createReducer(
  initialState,
  on(setEditInfoForm, (state, { input }) => ({ ...state, input: input }))
);
