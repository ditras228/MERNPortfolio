import { createReducer, on } from '@ngrx/store';
import { CreateDescInputs, setCreateDescForm } from './create-desc.actions';

export interface State {
  input: CreateDescInputs;
}
const initialState: State = {
  input: {} as CreateDescInputs,
};
export const createDescReducer = createReducer(
  initialState,
  on(setCreateDescForm, (state, { input }) => ({ ...state, input: input }))
);
